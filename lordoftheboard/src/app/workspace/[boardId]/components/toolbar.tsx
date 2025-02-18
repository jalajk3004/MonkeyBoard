import React from 'react'
import { ToolButton } from './toolbutton'
import { Circle, MousePointer, Pencil, RectangleHorizontal, Redo,  StickyNote, Type, Undo2Icon } from 'lucide-react'
import { CanvasMode, CanvasState, LayerType } from '../../../../../types/canvas';


interface ToolbarProps {
  CanvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;  
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const Toolbar = ({
  CanvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo,

}: ToolbarProps) => {
  return (
    <div className='absolute top-[50%] -translate-y-[50%] left-2  flex flex-col gap-y-4'>
      <div className='bg-white rounded-md shadow-md p-1.5 flex gap-y-1 flex-col items-center'>
        <ToolButton 
        label='Select' 
        icon={MousePointer} 
        onClick={()=> setCanvasState({mode:CanvasMode.None}) }
        isActive={
          CanvasState.mode===CanvasMode.None ||
          CanvasState.mode===CanvasMode.Translating ||
          CanvasState.mode===CanvasMode.SelectionNet ||
          CanvasState.mode===CanvasMode.Pressing ||
          CanvasState.mode===CanvasMode.Resizing 
        }
        />
        <ToolButton 
        label='Text' 
        icon={Type} 
        onClick={()=> setCanvasState({
          mode:CanvasMode.Inserting,
          layerType:LayerType.Text,

        }) }
        isActive={
          CanvasState.mode===CanvasMode.Inserting &&
          CanvasState.layerType===LayerType.Text  
        }
        />
        <ToolButton 
        label='Sticky Note' 
        icon={StickyNote} 
        onClick={()=> setCanvasState({
          mode:CanvasMode.Inserting,
          layerType:LayerType.Note,
        })}
        isActive={
          CanvasState.mode===CanvasMode.Inserting &&
          CanvasState.layerType===LayerType.Note  
        }
        />
        <ToolButton 
        label='Rectangle' 
        icon={RectangleHorizontal} 
        onClick={()=> setCanvasState({
          mode:CanvasMode.Inserting,
          layerType:LayerType.Rectangle,
        })}
        isActive={
          CanvasState.mode===CanvasMode.Inserting &&
          CanvasState.layerType===LayerType.Rectangle  
        }
        />
        <ToolButton 
        label='Ellipse' 
        icon={Circle} 
        onClick={()=> setCanvasState({
          mode:CanvasMode.Inserting,
          layerType:LayerType.Ellispe,
        })}
        isActive={
          CanvasState.mode===CanvasMode.Inserting &&
          CanvasState.layerType===LayerType.Ellispe  
        }
        />
        <ToolButton 
        label='Pen' 
        icon={Pencil} 
        onClick={()=> setCanvasState({
          mode:CanvasMode.Pencil,
          
        })}
        isActive={
          CanvasState.mode===CanvasMode.Pencil 
        }
        />

      </div>
      <div className='bg-white rounded-md shadow-md p-1.5 flex gap-y-1 flex-col items-center'>
      <ToolButton 
        label='Undo' 
        icon={Undo2Icon} 
        onClick={undo }
        isDisabled={!canUndo}
        />
        <ToolButton 
        label='Redo' 
        icon={Redo} 
        onClick={redo }
        isDisabled={!canRedo}
        />
        
        </div>
    </div>
  )
}

export default Toolbar
