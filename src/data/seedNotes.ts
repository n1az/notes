import type { Note } from '../types'

export const quantumComputingNotes: Omit<Note, 'id'>[] = [
  {
    title: "Google's Willow Quantum Chip Breakthrough",
    content: `<h2>Google's Revolutionary Willow Quantum Processor</h2>

<p>In December 2024, Google unveiled its groundbreaking <strong>Willow quantum chip</strong>, marking a pivotal moment in quantum computing history. This 105-qubit superconducting quantum processor represents a significant leap forward in quantum error correction and computational capability.</p>

<h3>🚀 Key Achievements</h3>
<ul>
  <li><strong>Quantum Error Correction:</strong> Willow demonstrates below-threshold error correction, meaning errors decrease as more qubits are added to the system</li>
  <li><strong>Exponential Improvement:</strong> Each additional layer of error correction reduces the error rate by a factor of 2</li>
  <li><strong>Computational Supremacy:</strong> Performed a benchmark calculation in under 5 minutes that would take classical supercomputers 10 septillion years</li>
</ul>

<h3>💡 Technical Innovations</h3>
<p>The Willow chip incorporates several breakthrough technologies:</p>
<ul>
  <li>Advanced surface code implementation</li>
  <li>Real-time error correction with sub-microsecond latency</li>
  <li>Improved qubit connectivity and gate fidelities</li>
  <li>State-of-the-art fabrication techniques for reduced noise</li>
</ul>

<p><em>This breakthrough brings us significantly closer to fault-tolerant quantum computers capable of solving real-world problems that are intractable for classical computers.</em></p>`,
    background: 'beige-dotted',
    fontFamily: 'Merriweather',
    fontSize: '16px',
    textColor: '#2d3748',
    createdAt: new Date('2024-12-15').toISOString(),
    updatedAt: new Date('2024-12-15').toISOString()
  },
  {
    title: "IBM's 1000+ Qubit Condor Processor",
    content: `<h2>IBM Condor: Breaking the 1000-Qubit Barrier</h2>

<p>IBM has achieved a historic milestone with the announcement of their <strong>Condor quantum processor</strong>, featuring over 1000 qubits - the first quantum computer to cross this significant threshold.</p>

<h3>🔬 Technical Specifications</h3>
<ul>
  <li><strong>Qubit Count:</strong> 1,121 superconducting qubits</li>
  <li><strong>Architecture:</strong> Heavy-hex lattice connectivity</li>
  <li><strong>Coherence Time:</strong> Improved T1 and T2 times compared to previous generations</li>
  <li><strong>Gate Fidelity:</strong> 99.5%+ two-qubit gate fidelity</li>
</ul>

<h3>🌟 Breakthrough Capabilities</h3>
<p>The Condor processor enables:</p>
<ul>
  <li>Complex quantum simulations of molecular systems</li>
  <li>Advanced quantum machine learning algorithms</li>
  <li>Large-scale optimization problems</li>
  <li>Quantum advantage demonstrations in specific domains</li>
</ul>

<h3>🔮 Future Roadmap</h3>
<p>IBM's quantum roadmap includes:</p>
<ul>
  <li><strong>2025:</strong> 4,000+ qubit systems</li>
  <li><strong>2026:</strong> 10,000+ qubit fault-tolerant systems</li>
  <li><strong>2030:</strong> 100,000+ qubit practical quantum computers</li>
</ul>

<blockquote>
<p>"We're not just building bigger quantum computers; we're building better ones. The Condor represents a new era where quantum computers can tackle problems that matter." - IBM Quantum Team</p>
</blockquote>`,
    background: 'notebook',
    fontFamily: 'Inter',
    fontSize: '16px',
    textColor: '#1a202c',
    createdAt: new Date('2024-11-20').toISOString(),
    updatedAt: new Date('2024-11-20').toISOString()
  },
  {
    title: "Quantum Algorithms Revolutionizing Drug Discovery",
    content: `<h2>Quantum Computing in Pharmaceutical Research</h2>

<p>Recent breakthroughs in quantum algorithms are accelerating drug discovery processes, potentially reducing the time from concept to clinical trials from decades to years.</p>

<h3>🧬 Molecular Simulation Advances</h3>
<p>Quantum computers excel at simulating molecular interactions because:</p>
<ul>
  <li>Molecules are inherently quantum mechanical systems</li>
  <li>Classical computers struggle with exponential scaling of molecular complexity</li>
  <li>Quantum algorithms can naturally represent quantum superposition and entanglement in molecules</li>
</ul>

<h3>💊 Current Applications</h3>

<h4>Protein Folding Prediction</h4>
<p>Quantum algorithms are being developed to:</p>
<ul>
  <li>Predict 3D protein structures from amino acid sequences</li>
  <li>Understand misfolding diseases like Alzheimer's and Parkinson's</li>
  <li>Design novel proteins with specific functions</li>
</ul>

<h4>Drug-Target Interaction</h4>
<p>Quantum simulations help researchers:</p>
<ul>
  <li>Model how potential drugs bind to target proteins</li>
  <li>Predict side effects and drug interactions</li>
  <li>Optimize drug efficacy and safety profiles</li>
</ul>

<h3>🚀 Recent Breakthroughs</h3>
<ul>
  <li><strong>Roche + Cambridge Quantum Computing:</strong> Quantum algorithms for Alzheimer's drug discovery</li>
  <li><strong>ProteinQure:</strong> Quantum-enhanced molecular discovery platform</li>
  <li><strong>Menten AI:</strong> Quantum machine learning for protein design</li>
</ul>

<h3>🔬 The Quantum Advantage</h3>
<p>Quantum computers could:</p>
<ul>
  <li>Reduce drug discovery time from 15+ years to 5-7 years</li>
  <li>Lower drug development costs by 50%+</li>
  <li>Enable personalized medicine at scale</li>
  <li>Discover previously impossible drug targets</li>
</ul>

<p><em>As quantum hardware continues to improve, we're approaching a future where quantum computers will be indispensable tools in the fight against disease.</em></p>`,
    background: 'grey-paper',
    fontFamily: 'Inter',
    fontSize: '16px',
    textColor: '#374151',
    createdAt: new Date('2024-10-10').toISOString(),
    updatedAt: new Date('2024-10-10').toISOString()
  },
  {
    title: "Quantum Internet: Building the Future Network",
    content: `<h2>The Dawn of the Quantum Internet</h2>

<p>Scientists and engineers worldwide are working towards creating a <strong>quantum internet</strong> - a network that uses quantum mechanical properties to enable unprecedented security and computational capabilities.</p>

<h3>🌐 What is the Quantum Internet?</h3>
<p>The quantum internet is a network that:</p>
<ul>
  <li>Transmits quantum information between quantum computers</li>
  <li>Uses quantum entanglement for ultra-secure communication</li>
  <li>Enables distributed quantum computing</li>
  <li>Provides unconditionally secure quantum key distribution</li>
</ul>

<h3>🔐 Quantum Key Distribution (QKD)</h3>
<p>Recent achievements in QKD include:</p>
<ul>
  <li><strong>China's Quantum Satellite Network:</strong> 700+ km satellite-to-ground QKD</li>
  <li><strong>European Quantum Internet Alliance:</strong> City-scale quantum networks across EU</li>
  <li><strong>US National Quantum Initiative:</strong> Coast-to-coast quantum backbone</li>
</ul>

<h3>🚀 Recent Milestones</h3>

<h4>2024 Breakthrough: Quantum Repeaters</h4>
<p>Researchers at Harvard and MIT demonstrated:</p>
<ul>
  <li>Long-distance quantum entanglement over 1000+ km</li>
  <li>Quantum memory storage for network synchronization</li>
  <li>Error correction for quantum communication</li>
</ul>

<h4>Commercial Quantum Networks</h4>
<ul>
  <li><strong>ID Quantique:</strong> Banking quantum networks in Geneva</li>
  <li><strong>Toshiba:</strong> Quantum-secured video conferencing</li>
  <li><strong>Quantum Xchange:</strong> Quantum-safe network infrastructure</li>
</ul>

<h3>🔮 Future Applications</h3>

<h4>Distributed Quantum Computing</h4>
<p>The quantum internet will enable:</p>
<ul>
  <li>Connecting multiple quantum computers into a quantum cloud</li>
  <li>Sharing quantum resources across geographic locations</li>
  <li>Collaborative quantum algorithms</li>
</ul>

<h4>Ultra-Secure Communications</h4>
<ul>
  <li>Government and military communications</li>
  <li>Financial transactions</li>
  <li>Healthcare data protection</li>
  <li>Critical infrastructure security</li>
</ul>

<h3>⚡ Timeline to Reality</h3>
<ul>
  <li><strong>2025-2027:</strong> Regional quantum networks</li>
  <li><strong>2028-2030:</strong> National quantum backbones</li>
  <li><strong>2030-2035:</strong> Global quantum internet</li>
</ul>

<blockquote>
<p>"The quantum internet represents the next evolutionary step in global communication infrastructure, offering security that is guaranteed by the laws of physics themselves."</p>
</blockquote>`,
    background: 'white',
    fontFamily: 'Merriweather',
    fontSize: '16px',
    textColor: '#1f2937',
    createdAt: new Date('2024-09-15').toISOString(),
    updatedAt: new Date('2024-09-15').toISOString()
  },
  {
    title: "Quantum Machine Learning: The Next AI Revolution",
    content: `<h2>Quantum Machine Learning: Where Quantum Meets AI</h2>

<p>The convergence of quantum computing and artificial intelligence is creating a new field: <strong>Quantum Machine Learning (QML)</strong>, which promises to revolutionize how we approach complex pattern recognition and optimization problems.</p>

<h3>🧠 Why Quantum + AI?</h3>
<p>Quantum computers offer unique advantages for machine learning:</p>
<ul>
  <li><strong>Exponential Speedup:</strong> Quantum algorithms can process exponentially large datasets</li>
  <li><strong>Quantum Parallelism:</strong> Explore multiple solutions simultaneously</li>
  <li><strong>Natural Feature Maps:</strong> Quantum states naturally represent high-dimensional data</li>
  <li><strong>Optimization Power:</strong> Quantum annealing for global optimization</li>
</ul>

<h3>🚀 Recent Breakthroughs</h3>

<h4>Google's Quantum Neural Networks</h4>
<p>Google AI has demonstrated:</p>
<ul>
  <li>Variational quantum classifiers with quantum advantage</li>
  <li>Quantum convolutional neural networks</li>
  <li>Quantum GANs for data generation</li>
</ul>

<h4>IBM's Qiskit Machine Learning</h4>
<ul>
  <li>Open-source quantum ML library</li>
  <li>Quantum feature maps and kernels</li>
  <li>Integration with classical ML frameworks</li>
</ul>

<h3>💡 Key Quantum ML Algorithms</h3>

<h4>Quantum Support Vector Machines</h4>
<p>Advantages:</p>
<ul>
  <li>Exponential feature space expansion</li>
  <li>Quantum kernel methods</li>
  <li>Faster training on large datasets</li>
</ul>

<h4>Variational Quantum Eigensolvers (VQE)</h4>
<ul>
  <li>Quantum chemistry applications</li>
  <li>Materials science optimization</li>
  <li>Financial portfolio optimization</li>
</ul>

<h4>Quantum Approximate Optimization Algorithm (QAOA)</h4>
<ul>
  <li>Combinatorial optimization problems</li>
  <li>Supply chain optimization</li>
  <li>Traffic flow optimization</li>
</ul>

<h3>🌟 Real-World Applications</h3>

<h4>Financial Services</h4>
<ul>
  <li><strong>JPMorgan Chase:</strong> Quantum algorithms for risk analysis</li>
  <li><strong>Goldman Sachs:</strong> Quantum Monte Carlo for option pricing</li>
  <li><strong>Wells Fargo:</strong> Quantum optimization for portfolio management</li>
</ul>

<h4>Healthcare & Pharmaceuticals</h4>
<ul>
  <li>Drug discovery acceleration</li>
  <li>Medical image analysis</li>
  <li>Personalized treatment optimization</li>
</ul>

<h4>Climate & Energy</h4>
<ul>
  <li>Weather prediction improvements</li>
  <li>Solar panel efficiency optimization</li>
  <li>Carbon capture technology design</li>
</ul>

<h3>⚡ Current Limitations & Future</h3>

<h4>Near-term Challenges</h4>
<ul>
  <li>Limited qubit counts and coherence times</li>
  <li>High error rates requiring error correction</li>
  <li>Classical simulation still competitive for many problems</li>
</ul>

<h4>Future Outlook (2025-2030)</h4>
<ul>
  <li>Fault-tolerant quantum computers with 1000+ logical qubits</li>
  <li>Quantum advantage in specific ML domains</li>
  <li>Hybrid classical-quantum ML workflows</li>
  <li>Commercial quantum ML platforms</li>
</ul>

<p><em>As quantum hardware matures, quantum machine learning will likely become the key to solving humanity's most complex computational challenges.</em></p>`,
    background: 'beige-dotted',
    fontFamily: 'Inter',
    fontSize: '16px',
    textColor: '#111827',
    createdAt: new Date('2024-08-22').toISOString(),
    updatedAt: new Date('2024-08-22').toISOString()
  }
]

// Function to generate unique IDs for notes
export function generateNoteId(): string {
  return `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Function to create seeded notes with proper IDs
export function createSeedNotes(): Note[] {
  return quantumComputingNotes.map(note => ({
    ...note,
    id: generateNoteId()
  }))
}