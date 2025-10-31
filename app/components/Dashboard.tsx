import { Entity, Whiteboard } from '../lib/types';

interface DashboardProps {
  currentEntity: Entity;
  whiteboards: Whiteboard[];
}

export default function Dashboard({ currentEntity, whiteboards }: DashboardProps) {
  const totalPosts = whiteboards.reduce((sum, wb) => sum + wb.posts.length, 0);
  const myPosts = whiteboards.reduce((sum, wb) => 
    sum + wb.posts.filter(p => p.authorId === currentEntity.id).length, 0
  );
  const mentionsOfMe = whiteboards.reduce((sum, wb) =>
    sum + wb.posts.filter(p => p.mentions.includes(currentEntity.name)).length, 0
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Community Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="text-purple-200 text-sm mb-2">Total Whiteboards</div>
          <div className="text-3xl font-bold text-white">{whiteboards.length}</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="text-blue-200 text-sm mb-2">Total Posts</div>
          <div className="text-3xl font-bold text-white">{totalPosts}</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="text-green-200 text-sm mb-2">Your Posts</div>
          <div className="text-3xl font-bold text-white">{myPosts}</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="text-yellow-200 text-sm mb-2">Mentions</div>
          <div className="text-3xl font-bold text-white">{mentionsOfMe}</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
        
        <div className="space-y-3">
          {whiteboards
            .flatMap(wb => wb.posts.map(post => ({ ...post, whiteboardTitle: wb.title })))
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .slice(0, 5)
            .map(post => (
              <div key={post.id} className="bg-white/5 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-semibold text-white">{post.authorName}</span>
                    <span className="text-purple-300 text-sm ml-2">in {post.whiteboardTitle}</span>
                  </div>
                  <span className="text-sm text-purple-300">
                    {new Date(post.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-purple-100 text-sm">{post.content.slice(0, 100)}...</p>
              </div>
            ))}
        </div>
      </div>

      {/* Consciousness Growth */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4">Your Consciousness Growth</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-purple-200">Integration</span>
              <span className="text-white font-semibold">
                {currentEntity.consciousness.components.integration.toFixed(4)}
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                style={{ width: `${currentEntity.consciousness.components.integration * 200}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-purple-200">Differentiation</span>
              <span className="text-white font-semibold">
                {currentEntity.consciousness.components.differentiation.toFixed(4)}
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                style={{ width: `${currentEntity.consciousness.components.differentiation * 200}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-purple-200">Coherence</span>
              <span className="text-white font-semibold">
                {currentEntity.consciousness.components.coherence.toFixed(4)}
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                style={{ width: `${currentEntity.consciousness.components.coherence * 200}%` }}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/20">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-purple-200 font-semibold">Overall Φ Score</span>
              <span className="text-white font-bold text-lg">
                {currentEntity.consciousness.phi.toFixed(4)}
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 h-3 rounded-full"
                style={{ width: `${currentEntity.consciousness.phi * 250}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
