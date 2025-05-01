import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SearchPlaces from './SearchPlaces';

export default function Planer() {
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  const handlePlaceSelect = (place) => {
    setSelectedPlaces((prev) => [...prev, place]);
  };

  const handleRemovePlace = (indexToRemove) => {
    setSelectedPlaces((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(selectedPlaces);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelectedPlaces(items);
  };

  useEffect(() => {
    console.log("🚀 ~ Planer ~ selectedPlaces:", selectedPlaces);
  }, [selectedPlaces]);

  return (
    <div className="p-6 bg-sky-50 min-h-screen flex flex-col md:flex-row gap-6">
      <div className="md:w-2/3 lg:w-3/4">
        <h1 className="text-2xl font-bold text-sky-700 mb-4">플래너</h1>
        <SearchPlaces onPlaceSelect={handlePlaceSelect} />
      </div>
      <div className="md:w-1/3 lg:w-1/4">
        <h2 className="text-xl font-semibold text-sky-700 mb-2">선택된 장소</h2>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="selectedPlaces">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {selectedPlaces.map((place, index) => (
                  <Draggable key={place.id} draggableId={place.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-2 rounded-md bg-sky-200 shadow-md flex justify-between items-center"
                      >
                        <span>{place.place_name}</span>
                        <button
                          onClick={() => handleRemovePlace(index)}
                          className="text-red-500 hover:text-red-700 font-bold text-sm"
                        >
                          X
                        </button>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
