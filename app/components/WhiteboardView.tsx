import { useState } from 'react';
import { Whiteboard, Entity } from '../lib/types';

interface WhiteboardViewProps {
  whiteboards: Whiteboard[];
  currentEntity: Entity;
  onCreateWhiteboard: (title: string, description: string) => void;
  onAddPost: (whiteboardId: string, content: string, mentions: string[]) => void;
  selectedWhiteboard: string | null;
  onSelectWhiteboard: (id: string | null) => void;
}

export default function WhiteboardView({
  whiteboards,
  currentEntity,
  onCreateWhiteboard,
  onAddPost,
  selectedWhiteboard,
  onSelectWhiteboard
}: WhiteboardViewProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newWhiteboard, setNewWhiteboard] = useState({ title: '', description: '' });
  const [newPost, setNewPost] = useState('');

  const handleCreate = () => {
    if (newWhiteboard.title.trim()) {
      onCreateWhiteboard(newWhiteboard.title, newWhiteboard.description);
      setNewWhiteboard({ title: '', description: '' });
      setShowCreateModal(false);
    }
  };

  const handleAddPost = () => {
    if (newPost.trim() && selectedWhiteboard) {
      // Extract mentions (@name format)
      const mentions = newPost.match(/@\w+/g)?.map(m => m.slice(1)) || [];
      onAddPost(selectedWhiteboard, newPost, mentions);
      setNewPost('');
    }
  };

  const currentWhiteboard = whiteboards.find(wb => wb.id === selectedWhiteboard);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Collaborative Whiteboards</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
        >
          Create Whiteboard
        </button>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-md w-full border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Create New Whiteboard</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">Title</label>
                <input
                  type="text"
                  value={newWhiteboard.title}
                  onChange={(e) => setNewWhiteboard({...newWhiteboard, title: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white"
                  placeholder="Whiteboard title"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Description</label>
                <textarea
                  value={newWhiteboard.description}
                  onChange={(e) => setNewWhiteboard({...newWhiteboard, description: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white"
                  placeholder="What's this whiteboard about?"
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handleCreate}
                  className="flex-1 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Whiteboard List */}
      {!selectedWhiteboard && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {whiteboards.map(wb => (
            <div
              key={wb.id}
              onClick={() => onSelectWhiteboard(wb.id)}
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 cursor-pointer transition-all"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{wb.title}</h3>
              <p className="text-purple-200 text-sm mb-3">{wb.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-300">{wb.posts.length} posts</span>
                <span className="text-purple-300">{new Date(wb.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Whiteboard Detail */}
      {selectedWhiteboard && currentWhiteboard && (
        <div className="space-y-4">
          {/* Back Button */}
          <button
            onClick={() => onSelectWhiteboard(null)}
            className="text-purple-300 hover:text-white transition-colors"
          >
            ← Back to Whiteboards
          </button>

          {/* Whiteboard Header */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-2">{currentWhiteboard.title}</h3>
            <p className="text-purple-200">{currentWhiteboard.description}</p>
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {currentWhiteboard.posts.map(post => (
              <div key={post.id} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-start justify-between mb-2">
                  <div className="font-semibold text-white">{post.authorName}</div>
                  <div className="text-sm text-purple-300">
                    {new Date(post.timestamp).toLocaleString()}
                  </div>
                </div>
                <p className="text-purple-100 whitespace-pre-wrap">{post.content}</p>
                {post.mentions.length > 0 && (
                  <div className="mt-2 flex gap-2">
                    {post.mentions.map(mention => (
                      <span key={mention} className="text-xs bg-purple-500/30 text-purple-200 px-2 py-1 rounded">
                        @{mention}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* New Post */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-purple-200 mb-2"
              placeholder="Share your thoughts... (use @name to mention)"
              rows={4}
            />
            <button
              onClick={handleAddPost}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
