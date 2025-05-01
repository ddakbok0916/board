'use client';

import React, { useEffect, useState, useRef } from 'react';
import Pagination from '../ui/Pagination';

export default function SearchPlaces ({ onPlaceSelect }) {
  const [keyword, setKeyword] = useState('');
  const [places, setPlaces] = useState([]);
  const [pagination, setPagination] = useState(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.kakao) {
      const { kakao } = window;
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
      };

      mapRef.current = new kakao.maps.Map(container, options);
    }
  }, []);

  const handleSearch = () => {
    if (!window.kakao || !mapRef.current) {
      alert('카카오맵 API가 로드되지 않았습니다.');
      return;
    }

    const ps = new kakao.maps.services.Places(mapRef.current);
    const searchOptions = {
      size: 5, // 한 페이지에 표시할 결과 수를 5개로 설정
    };

    ps.keywordSearch(
      keyword,
      (data, status, paginationData) => {
        if (status === kakao.maps.services.Status.OK) {
          setPlaces(data);
          setPagination(paginationData);
          displayMarkers(data);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          alert('검색 결과가 없습니다.');
        } else {
          alert('검색 중 오류가 발생했습니다.');
        }
      },
      searchOptions,
    );
  };

  const displayMarkers = (places) => {
    if (!window.kakao || !mapRef.current) return;

    const { kakao } = window;
    const bounds = new kakao.maps.LatLngBounds();

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    places.forEach((place, index) => {
      const position = new kakao.maps.LatLng(place.y, place.x);
      const marker = new kakao.maps.Marker({
        position,
        map: mapRef.current,
      });

      kakao.maps.event.addListener(marker, 'click', () => {
        const infoWindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;">${place.place_name}</div>`,
        });
        infoWindow.open(mapRef.current, marker);
      });

      markersRef.current.push(marker);
      bounds.extend(position);
    });

    mapRef.current.setBounds(bounds);
  };

  const handlePageClick = (page) => {
    if (pagination) {
      pagination.gotoPage(page);
    }
  };

  return (
    <div className='flex flex-col md:flex-row gap-6'>
      <div className='md:w-1/3 lg:w-1/4 p-4 bg-sky-50 rounded-lg shadow-lg'>
        <input
          type='text'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          placeholder='검색할 장소를 입력하세요'
          className='w-full border rounded px-3 py-2 mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300'
        />
        <button onClick={handleSearch} className='w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition text-sm'>
          검색
        </button>
        <ul className='mt-4 space-y-2'>
          {places.map((place, index) => (
            <li key={place.id} onClick={() => onPlaceSelect(place)} className='cursor-pointer p-2 border-b hover:bg-sky-100 text-sm'>
              <strong>
                {index + 1}. {place.place_name}
              </strong>
              <p className='text-xs text-gray-500'>{place.address_name}</p>
            </li>
          ))}
        </ul>
        <Pagination pagination={pagination} onPageClick={handlePageClick} />
      </div>
      <div className='md:w-2/3 lg:w-3/4'>
        <div id='map' style={{ width: '100%', height: '500px', borderRadius: '10px' }} className='shadow-xl bg-sky-100'></div>
      </div>
    </div>
  );
}
