/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { BiMove, BiTrash, BiPlus, BiEdit } from 'react-icons/bi';

type LessonItem = {
  id: string;
  title: string;
  duration: string;
  difficulty: string;
};

type ModuleOrganizerProps = {
  moduleTitle: string;
  lessons: LessonItem[];
  onLessonsReorder: (newOrder: LessonItem[]) => void;
  onLessonRemove: (lessonId: string) => void;
  onModuleTitleChange: (title: string) => void;
};

const ModuleOrganizer: React.FC<ModuleOrganizerProps> = ({
  moduleTitle,
  lessons,
  onLessonsReorder,
  onLessonRemove,
  onModuleTitleChange,
}) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState(moduleTitle);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(lessons);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onLessonsReorder(items);
  };

  const handleTitleSave = () => {
    onModuleTitleChange(title);
    setEditingTitle(false);
  };

  return (
    <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-sm">
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
        {editingTitle ? (
          <div className="flex items-center gap-2 flex-1">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 px-2 py-1 border border-neutral-300 dark:border-neutral-600 rounded focus:outline-none focus:ring-2 focus:ring-red-400 dark:bg-neutral-700"
              autoFocus
            />
            <button
              onClick={handleTitleSave}
              className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <h3 className="font-medium text-lg text-neutral-900 dark:text-neutral-100">{moduleTitle}</h3>
            <button
              onClick={() => setEditingTitle(true)}
              className="ml-2 p-1 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            >
              <BiEdit size={16} />
            </button>
          </div>
        )}
        <div className="text-sm text-neutral-500 dark:text-neutral-400">
          {lessons.length} lessons
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="lessons">
          {(provided: any) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="p-2"
            >
              {lessons.map((lesson, index) => (
                <Draggable key={lesson.id} draggableId={lesson.id} index={index}>
                  {(provided: any) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex items-center p-3 my-1 bg-neutral-50 dark:bg-neutral-700/40 rounded-lg border border-neutral-200 dark:border-neutral-600"
                    >
                      <div
                        {...provided.dragHandleProps}
                        className="p-1 mr-3 text-neutral-400 cursor-grab"
                      >
                        <BiMove size={18} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-neutral-800 dark:text-neutral-200">
                          {lesson.title}
                        </div>
                        <div className="flex gap-2 text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                          <span>{lesson.duration}</span>
                          <span>•</span>
                          <span>{lesson.difficulty}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => onLessonRemove(lesson.id)}
                        className="p-1 text-neutral-400 hover:text-red-500"
                      >
                        <BiTrash size={18} />
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}

              <button className="w-full mt-2 p-2 flex items-center justify-center text-sm text-neutral-600 dark:text-neutral-400 border border-dashed border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700/40">
                <BiPlus size={18} className="mr-1" />
                Add Lesson
              </button>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 border-t border-neutral-200 dark:border-neutral-700 text-sm text-neutral-500 dark:text-neutral-400">
        Total duration: {lessons.reduce((total, lesson) => {
          const minutes = parseInt(lesson.duration.split(' ')[0]);
          return total + (isNaN(minutes) ? 0 : minutes);
        }, 0)} minutes
      </div>
    </div>
  );
};

export default ModuleOrganizer;
