interface UniversityIllustrationProps {
  className?: string;
}

export default function UniversityIllustration({ className = "" }: UniversityIllustrationProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <svg
        viewBox="0 0 500 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Sky gradient background */}
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" />
            <stop offset="100%" stopColor="#E0F6FF" />
          </linearGradient>
          <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF" />
            <stop offset="100%" stopColor="#F8F9FA" />
          </linearGradient>
        </defs>
        
        <rect width="500" height="400" fill="url(#skyGradient)" />
        
        {/* Main university building */}
        <rect x="150" y="200" width="200" height="150" fill="url(#buildingGradient)" stroke="#E5E7EB" strokeWidth="2"/>
        
        {/* Building details */}
        <rect x="160" y="220" width="30" height="40" fill="#1976D2" opacity="0.7"/>
        <rect x="200" y="220" width="30" height="40" fill="#1976D2" opacity="0.7"/>
        <rect x="240" y="220" width="30" height="40" fill="#1976D2" opacity="0.7"/>
        <rect x="280" y="220" width="30" height="40" fill="#1976D2" opacity="0.7"/>
        <rect x="320" y="220" width="20" height="40" fill="#1976D2" opacity="0.7"/>
        
        {/* Windows on second floor */}
        <rect x="160" y="270" width="30" height="30" fill="#1976D2" opacity="0.5"/>
        <rect x="200" y="270" width="30" height="30" fill="#1976D2" opacity="0.5"/>
        <rect x="240" y="270" width="30" height="30" fill="#1976D2" opacity="0.5"/>
        <rect x="280" y="270" width="30" height="30" fill="#1976D2" opacity="0.5"/>
        <rect x="320" y="270" width="20" height="30" fill="#1976D2" opacity="0.5"/>
        
        {/* Clock tower */}
        <rect x="230" y="150" width="40" height="50" fill="url(#buildingGradient)" stroke="#E5E7EB" strokeWidth="2"/>
        <circle cx="250" cy="175" r="15" fill="#FF7043" opacity="0.8"/>
        <circle cx="250" cy="175" r="2" fill="#FFF"/>
        <line x1="250" y1="175" x2="250" y2="165" stroke="#FFF" strokeWidth="2"/>
        <line x1="250" y1="175" x2="258" y2="175" stroke="#FFF" strokeWidth="2"/>
        
        {/* Roof */}
        <polygon points="140,200 250,120 360,200" fill="#8B5CF6" opacity="0.8"/>
        
        {/* Trees */}
        <circle cx="80" cy="280" r="40" fill="#10B981" opacity="0.7"/>
        <rect x="75" y="280" width="10" height="40" fill="#8B4513"/>
        
        <circle cx="420" cy="290" r="35" fill="#10B981" opacity="0.7"/>
        <rect x="416" y="290" width="8" height="35" fill="#8B4513"/>
        
        {/* Students walking */}
        <circle cx="100" cy="320" r="8" fill="#FBBF24"/>
        <rect x="96" y="320" width="8" height="20" fill="#3B82F6"/>
        <rect x="94" y="340" width="4" height="10" fill="#1F2937"/>
        <rect x="102" y="340" width="4" height="10" fill="#1F2937"/>
        
        <circle cx="130" cy="325" r="8" fill="#EC4899"/>
        <rect x="126" y="325" width="8" height="20" fill="#EF4444"/>
        <rect x="124" y="345" width="4" height="10" fill="#1F2937"/>
        <rect x="132" y="345" width="4" height="10" fill="#1F2937"/>
        
        {/* Books floating */}
        <rect x="50" y="150" width="20" height="15" fill="#FF7043" opacity="0.8" transform="rotate(15 60 157.5)"/>
        <rect x="400" y="160" width="25" height="18" fill="#1976D2" opacity="0.8" transform="rotate(-20 412.5 169)"/>
        
        {/* Graduation caps floating */}
        <polygon points="450,100 460,95 470,100 465,105" fill="#1F2937" opacity="0.7"/>
        <circle cx="465" cy="100" r="2" fill="#FBBF24"/>
        
        <polygon points="30,120 40,115 50,120 45,125" fill="#1F2937" opacity="0.7"/>
        <circle cx="45" cy="120" r="2" fill="#FBBF24"/>
        
        {/* Clouds */}
        <ellipse cx="100" cy="80" rx="25" ry="15" fill="#FFF" opacity="0.8"/>
        <ellipse cx="380" cy="60" rx="30" ry="18" fill="#FFF" opacity="0.8"/>
      </svg>
    </div>
  );
}