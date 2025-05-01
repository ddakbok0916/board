const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
const bcrypt = require('bcrypt');
const db = require('../lib/dbConnection');
const _ = require('lodash');
const { URL, URLSearchParams } = require('url');
const { currentTimeGen } = require('../lib/utils');

passport.serializeUser((user, done) => {
  // Strategy 성공 시 호출됨
  done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
});

passport.deserializeUser((user, done) => {
  // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
  done(null, user); // 여기의 user가 req.user가 됨
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'nickname', // 닉네임 필드 사용
      passwordField: 'nickname', // 비밀번호는 사용하지 않음
      session: true,
      passReqToCallback: true,
    },
    async (req, nickname, _, done) => {
      console.log('Authenticating with nickname:', nickname);

      try {
        // 닉네임으로 사용자 정보 확인
        const user = await db.connect(async function (conn) {
          const query = 'SELECT * FROM users WHERE nickname = ?';
          const [rows] = await conn.query(query, [nickname]);
          return rows.length ? rows[0] : null;
        });

        if (!user) {
          // 닉네임이 없으면 새 사용자 등록
          console.log('User not found. Registering new user...');
          const newUser = await db.transaction(async function (conn) {
            const now = currentTimeGen();
            const insertQuery = `
              INSERT INTO users (nickname, created_at)
              VALUES (?, STR_TO_DATE(?, '%Y-%m-%d %H:%i:%s'))
            `;
            const [result] = await conn.query(insertQuery, [nickname, now]);
            return { id: result.insertId, nickname };
          });

          return done(null, newUser);
        }

        // 기존 사용자 반환
        console.log('User found:', user);
        return done(null, user);
      } catch (err) {
        console.error('Error during authentication:', err);
        return done(null, false, { message: 'An error occurred during login.' });
      }
    }
  )
);

var setup = function (app) {
  // 로그인 라우트
  app.post('/login', (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
      if (error) return res.status(500).json({ error: error.message });
      if (!user) {
        return res.status(400).json({ error: info.message || 'Login failed' });
      }

      req.logIn(user, async (error) => {
        if (error) return next(error);

        // 로그인 성공 후 사용자 정보 반환
        res.status(200).json({
          message: 'Login successful',
          user: {
            id: user.id,
            nickname: user.nickname,
          },
        });
      });
    })(req, res, next);
  });

  // 로그아웃 라우트
  app.post('/logout', (req, res) => {
    req.logout((err) => {
      if (err) return res.status(500).json({ error: 'Logout failed' });
      res.status(200).json({ message: 'Logout successful' });
    });
  });

  // 프로필 확인
  app.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
      return res.status(200).json(req.user);
    }
    res.status(401).json({ message: 'Not authenticated' });
  });
};

exports.setup = setup;