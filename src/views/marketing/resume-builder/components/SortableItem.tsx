import { memo, useState, useMemo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { LuPencil } from 'react-icons/lu';
import { useAppDispatch } from '@/store';
import { setInitHeadingTitle } from '@/store/actions/resumeActions';

interface SortableItemProps {
  id: string;
  title: string;
  subTitle?: string;
  contentId: string;
  renderContent: (contentId: string) => React.ReactNode;
}

const SortableItem: React.FC<SortableItemProps> = memo(({ id, title, subTitle, contentId, renderContent }) => {
  const dispatch = useAppDispatch();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
  };

  const content = useMemo(() => renderContent(contentId), [contentId, renderContent]);

  const handleSaveTitle = () => {
    dispatch(setInitHeadingTitle(id, editedTitle));
    setIsEditing(false);
  };

  return (
    <div ref={setNodeRef} style={style} className="w-full mb-8 cursor-default">
      <div className="flex justify-between items-center group">
        <div className="flex items-center">
          <div className="cursor-move opacity-0 group-hover:opacity-100 transition-opacity duration-300" {...listeners} {...attributes}>
            <RxDragHandleDots2 className="text-lg text-gray-500 hover:text-gray-700 ml-[-18px]" />
          </div>
          {!isEditing ? (
            <h2 className="text-xl font-semibold mb-0 text-gray-800 cursor-default drop-shadow-md">{title}</h2>
          ) : (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleSaveTitle}
              className="text-xl font-semibold mb-0 text-gray-800 border-b border-gray-300 outline-none focus:border-blue-500"
              autoFocus
            />
          )}
          <LuPencil
            className="cursor-pointer ml-2 text-lg text-gray-500 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => setIsEditing(true)}
          />
        </div>
      </div>
      {subTitle && <p className="text-sm text-gray-400 font-light">{subTitle}</p>}
      <div className="mt-4">{content}</div>
    </div>
  );
});

SortableItem.displayName = 'SortableItem';
export default SortableItem;
