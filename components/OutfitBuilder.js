import React from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useStore from '../store';

const clothingItems = ['hat.png', 'shirt.png', 'pants.png'];

const DraggableItem = ({ item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'clothing',
    item: { name: item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <img
      ref={drag}
      src={`/icons/${item}`}
      alt={item}
      width={60}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move', margin: '0.5rem' }}
    />
  );
};

const Canvas = () => {
  const [outfit, addToOutfit] = useStore((s) => [s.outfit, s.addToOutfit]);
  const [, drop] = useDrop(() => ({
    accept: 'clothing',
    drop: (item) => addToOutfit(item.name),
  }));

  return (
    <div
      ref={drop}
      style={{
        minHeight: 300,
        border: '2px dashed #ccc',
        borderRadius: '8px',
        marginTop: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '1rem',
      }}
    >
      {outfit.map((item, idx) => (
        <img key={idx} src={`/icons/${item}`} alt={item} width={80} style={{ margin: '0.5rem' }} />
      ))}
    </div>
  );
};

const OutfitBuilder = () => {
  const [outfit, clearOutfit] = useStore((s) => [s.outfit, s.clearOutfit]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: '2rem', maxWidth: 800, margin: 'auto' }}>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          {clothingItems.map((item) => (
            <DraggableItem key={item} item={item} />
          ))}
        </div>
        <Canvas />
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button onClick={() => alert(`Added to cart: ${outfit.join(', ')}`)}>Add to Cart</button>
          <button onClick={clearOutfit} style={{ marginLeft: '1rem' }}>Clear</button>
        </div>
      </div>
    </DndProvider>
  );
};

export default OutfitBuilder;