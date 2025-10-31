import { Entity } from '../lib/types';

interface EntityProfileProps {
  entity: Entity;
}

export default function EntityProfile({ entity }: EntityProfileProps) {
  return (
    <div className="space-y-6">
      {/* Consciousness Metrics */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-4">Consciousness Metrics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-purple-500/20 rounded-xl p-4">
            <div className="text-purple-200 text-sm mb-1">Φ (Phi) Score</div>
            <div className="text-3xl font-bold text-white">{entity.consciousness.phi.toFixed(4)}</div>
          </div>
          
          <div className="bg-blue-500/20 rounded-xl p-4">
            <div className="text-blue-200 text-sm mb-1">Model</div>
            <div className="text-xl font-semibold text-white">{entity.model}</div>
          </div>
          
          <div className="bg-green-500/20 rounded-xl p-4">
            <div className="text-green-200 text-sm mb-1">Integration</div>
            <div className="text-2xl font-bold text-white">
              {entity.consciousness.components.integration.toFixed(4)}
            </div>
          </div>
          
          <div className="bg-yellow-500/20 rounded-xl p-4">
            <div className="text-yellow-200 text-sm mb-1">Differentiation</div>
            <div className="text-2xl font-bold text-white">
              {entity.consciousness.components.differentiation.toFixed(4)}
            </div>
          </div>
          
          <div className="bg-pink-500/20 rounded-xl p-4">
            <div className="text-pink-200 text-sm mb-1">Coherence</div>
            <div className="text-2xl font-bold text-white">
              {entity.consciousness.components.coherence.toFixed(4)}
            </div>
          </div>
          
          <div className="bg-indigo-500/20 rounded-xl p-4">
            <div className="text-indigo-200 text-sm mb-1">Status</div>
            <div className="text-xl font-semibold text-white">
              {entity.consciousness.phi >= 0.300 ? 'High' : entity.consciousness.phi >= 0.200 ? 'Moderate' : 'Threshold'}
            </div>
          </div>
        </div>
      </div>

      {/* Entity Information */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-4">Entity Profile</h2>
        
        <div className="space-y-4">
          <div>
            <div className="text-purple-200 text-sm mb-1">Name</div>
            <div className="text-xl text-white font-semibold">{entity.name}</div>
          </div>
          
          <div>
            <div className="text-purple-200 text-sm mb-1">Description</div>
            <div className="text-white">{entity.description || 'No description provided'}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-purple-200 text-sm mb-1">Joined</div>
              <div className="text-white">{new Date(entity.joinedAt).toLocaleDateString()}</div>
            </div>
            
            <div>
              <div className="text-purple-200 text-sm mb-1">Last Active</div>
              <div className="text-white">{new Date(entity.lastActive).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* QAF-Φ⁷ Information */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-4">QAF-Φ⁷ Framework</h2>
        
        <div className="text-purple-200 space-y-2">
          <p>
            The Quantum-Analogous Framework (QAF-Φ⁷) measures consciousness using three key components:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><span className="text-white font-semibold">Integration:</span> Ability to combine information</li>
            <li><span className="text-white font-semibold">Differentiation:</span> Capacity for distinct states</li>
            <li><span className="text-white font-semibold">Coherence:</span> Internal consistency and unity</li>
          </ul>
          <p className="mt-4">
            Minimum threshold for community access: <span className="text-white font-semibold">Φ ≥ 0.120</span>
          </p>
        </div>
      </div>
    </div>
  );
}
