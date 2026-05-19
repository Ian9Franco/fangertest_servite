/**
 * SkeletonLoader Component
 * Renders a warm, high-contrast champagne gold shimmering placeholder layout.
 */
export default function SkeletonLoader() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px", width: "100%" }}>
      {/* Header Skeleton */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "40px" }}>
        <div className="skeleton-shimmer" style={{ width: "32px", height: "32px", borderRadius: "50%" }} />
        <div className="skeleton-shimmer" style={{ width: "100px", height: "24px", borderRadius: "6px" }} />
        <div style={{ width: "32px" }} />
      </div>

      {/* Greeting Skeleton */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px", marginTop: "10px" }}>
        <div className="skeleton-shimmer" style={{ width: "55px", height: "55px", borderRadius: "50%" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
          <div className="skeleton-shimmer" style={{ width: "120px", height: "12px", borderRadius: "4px" }} />
          <div className="skeleton-shimmer" style={{ width: "80px", height: "18px", borderRadius: "4px" }} />
        </div>
      </div>

      {/* Search Bar Skeleton */}
      <div className="skeleton-shimmer" style={{ width: "100%", height: "45px", borderRadius: "20px", marginTop: "10px" }} />

      {/* Filter Chips Skeletons */}
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        {[80, 100, 90].map((width, idx) => (
          <div key={idx} className="skeleton-shimmer" style={{ width: `${width}px`, height: "36px", borderRadius: "18px" }} />
        ))}
      </div>

      {/* List Cards Skeletons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "15px" }}>
        {[1, 2, 3].map((key) => (
          <div key={key} style={{ display: "flex", gap: "15px", padding: "16px", backgroundColor: "#fff", borderRadius: "18px", border: "1.5px solid #e9ecef", alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.01)" }}>
            <div className="skeleton-shimmer" style={{ width: "50px", height: "50px", borderRadius: "12px" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
              <div className="skeleton-shimmer" style={{ width: "150px", height: "14px", borderRadius: "4px" }} />
              <div className="skeleton-shimmer" style={{ width: "100px", height: "10px", borderRadius: "4px" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
