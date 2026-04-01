import { useState, useEffect, useRef } from "react";

const AVATAR_COLORS = [
  ["#FF6B6B", "#FFE66D"],
  ["#4ECDC4", "#45B7D1"],
  ["#96CEB4", "#FFEAA7"],
  ["#DDA0DD", "#F0E68C"],
  ["#FA8072", "#87CEEB"],
  ["#98D8C8", "#F7DC6F"],
  ["#AED6F1", "#A9DFBF"],
  ["#F1948A", "#D7DBDD"],
  ["#82E0AA", "#F9E79F"],
  ["#85C1E9", "#F0B27A"],
];

const AVATAR_FACES = [
  { eyes: "👀", mouth: "😊" },
  { eyes: "👁️👁️", mouth: "😄" },
  { eyes: "🫦", mouth: "😎" },
  { eyes: "👀", mouth: "😁" },
  { eyes: "👀", mouth: "🙂" },
  { eyes: "👀", mouth: "😃" },
  { eyes: "👀", mouth: "😆" },
  { eyes: "👀", mouth: "😋" },
  { eyes: "👀", mouth: "🥰" },
  { eyes: "👀", mouth: "😇" },
];

const CartoonAvatar = ({ name, index }) => {
  const [bg1, bg2] = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      style={{
        width: 90,
        height: 90,
        borderRadius: "50%",
        background: `radial-gradient(circle at 35% 35%, ${bg1}, ${bg2})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 28,
        fontWeight: 900,
        color: "#fff",
        border: "4px solid #fff",
        boxShadow: `0 6px 20px ${bg1}88, 0 0 0 3px ${bg2}55`,
        fontFamily: "'Fredoka One', cursive",
        letterSpacing: 2,
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.3s cubic-bezier(.34,1.56,.64,1)",
      }}
    >
      <span style={{ textShadow: "0 2px 6px rgba(0,0,0,0.25)" }}>{initials}</span>
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 14,
          width: 18,
          height: 10,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.45)",
          transform: "rotate(-30deg)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

const StarBurst = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" style={{ display: "inline", verticalAlign: "middle" }}>
    <polygon
      points="11,1 13.5,8.5 21,8.5 15,13.5 17.5,21 11,16.5 4.5,21 7,13.5 1,8.5 8.5,8.5"
      fill={color}
      stroke="#fff"
      strokeWidth="1.2"
    />
  </svg>
);

const Card = ({ user, index, visible }) => {
  const [hovered, setHovered] = useState(false);
  const [bg1, bg2] = AVATAR_COLORS[index % AVATAR_COLORS.length];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 28,
        padding: "28px 26px 22px",
        border: `3.5px solid ${hovered ? bg1 : "#f0f0f0"}`,
        boxShadow: hovered
          ? `0 16px 48px ${bg1}44, 0 2px 0 ${bg1}`
          : "0 4px 24px rgba(0,0,0,0.08)",
        transform: visible
          ? hovered
            ? "translateY(-10px) scale(1.025) rotate(-0.5deg)"
            : "translateY(0) scale(1)"
          : "translateY(40px) scale(0.93)",
        opacity: visible ? 1 : 0,
        transition: `
          transform 0.55s cubic-bezier(.34,1.56,.64,1) ${index * 60}ms,
          opacity 0.45s ease ${index * 60}ms,
          box-shadow 0.3s ease,
          border-color 0.3s ease
        `,
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent blob */}
      <div
        style={{
          position: "absolute",
          top: -30,
          right: -30,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${bg2}66, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 18 }}>
        <CartoonAvatar name={user.name} index={index} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'Fredoka One', cursive",
              fontSize: 20,
              color: "#2d2d2d",
              lineHeight: 1.1,
              marginBottom: 4,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {user.name}
          </div>
          <div
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: 13,
              color: bg1,
              fontWeight: 700,
              letterSpacing: 0.5,
            }}
          >
            @{user.username}
          </div>
        </div>
      </div>

      {/* Divider squiggle */}
      <svg viewBox="0 0 220 14" width="100%" height="14" style={{ display: "block", marginBottom: 14 }}>
        <path
          d="M0,7 Q27,0 55,7 T110,7 T165,7 T220,7"
          fill="none"
          stroke={`${bg1}66`}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* Info rows */}
      {[
        { icon: "✉️", label: user.email },
        { icon: "📞", label: user.phone },
        { icon: "🌐", label: user.website },
        {
          icon: "🏙️",
          label: `${user.address.street}, ${user.address.city}`,
        },
        { icon: "🏢", label: user.company.name },
      ].map(({ icon, label }) => (
        <div
          key={label}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            marginBottom: 8,
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>{icon}</span>
          <span
            style={{
              fontSize: 13,
              color: "#555",
              fontWeight: 600,
              wordBreak: "break-all",
              lineHeight: 1.4,
            }}
          >
            {label}
          </span>
        </div>
      ))}

      {/* Catchphrase tag */}
      <div
        style={{
          marginTop: 14,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: `linear-gradient(90deg, ${bg1}22, ${bg2}33)`,
          border: `2px solid ${bg1}55`,
          borderRadius: 30,
          padding: "5px 14px",
          fontFamily: "'Fredoka One', cursive",
          fontSize: 12,
          color: bg1,
          letterSpacing: 0.5,
        }}
      >
        <StarBurst color={bg1} />
        {user.company.catchPhrase.length > 38
          ? user.company.catchPhrase.slice(0, 35) + "…"
          : user.company.catchPhrase}
      </div>
    </div>
  );
};

const FloatingShape = ({ style, children }) => (
  <div
    style={{
      position: "fixed",
      pointerEvents: "none",
      userSelect: "none",
      animation: "floaty 5s ease-in-out infinite",
      ...style,
    }}
  >
    {children}
  </div>
);

export default function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((r) => r.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
        setTimeout(() => setVisible(true), 80);
      });
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.company.name.toLowerCase().includes(search.toLowerCase()) ||
      u.address.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #FFF9F0;
          min-height: 100vh;
        }

        @keyframes floaty {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-18px) rotate(8deg); }
          66% { transform: translateY(10px) rotate(-5deg); }
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulseBg {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes blobWave {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }

        .search-wrap input::placeholder { color: #c5b9af; }
        .search-wrap input:focus { outline: none; }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .header-title {
          animation: fadeSlideDown 0.8s cubic-bezier(.34,1.56,.64,1) both;
        }

        .search-anim {
          animation: fadeSlideDown 0.9s cubic-bezier(.34,1.56,.64,1) 0.15s both;
        }

        .empty-bounce {
          animation: floaty 2.5s ease-in-out infinite;
        }

        .loader-spin {
          animation: spin 0.9s linear infinite;
        }
      `}</style>

      {/* Decorative background blobs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <div style={{
          position: "absolute", top: -80, left: -80, width: 340, height: 340,
          background: "radial-gradient(circle, #FFD6E055, transparent 70%)",
          animation: "blobWave 8s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: -60, right: -60, width: 300, height: 300,
          background: "radial-gradient(circle, #C7F5E855, transparent 70%)",
          animation: "blobWave 10s ease-in-out infinite reverse",
        }} />
        <div style={{
          position: "absolute", top: "40%", right: "5%", width: 200, height: 200,
          background: "radial-gradient(circle, #FFE4B555, transparent 70%)",
          animation: "blobWave 7s ease-in-out 2s infinite",
        }} />
      </div>

      {/* Floating decoration */}
      <FloatingShape style={{ top: 80, right: "8%", fontSize: 36, opacity: 0.35, animationDelay: "0.5s" }}>⭐</FloatingShape>
      <FloatingShape style={{ top: 180, left: "5%", fontSize: 28, opacity: 0.3, animationDelay: "1.2s" }}>🌟</FloatingShape>
      <FloatingShape style={{ bottom: 100, left: "8%", fontSize: 30, opacity: 0.25, animationDelay: "0.8s" }}>💫</FloatingShape>
      <FloatingShape style={{ bottom: 200, right: "6%", fontSize: 32, opacity: 0.28, animationDelay: "2s" }}>✨</FloatingShape>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "48px 24px 64px" }}>

        {/* Header */}
        <div className="header-title" style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
            <span style={{ fontSize: 48, animation: "wiggle 2s ease-in-out infinite" }}>🎪</span>
            <h1 style={{
              fontFamily: "'Fredoka One', cursive",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              background: "linear-gradient(135deg, #FF6B6B, #FF8E53, #FFC300, #56CCF2, #6FCF97)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1.1,
              letterSpacing: 1,
            }}>
              People Town!
            </h1>
            <span style={{ fontSize: 48, animation: "wiggle 2s ease-in-out infinite", animationDelay: "0.5s" }}>🌈</span>
          </div>
          <p style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: 16,
            color: "#a09080",
            fontWeight: 700,
            letterSpacing: 0.5,
          }}>
            ✦ Meet all the wonderful folks in our cartoon directory ✦
          </p>
        </div>

        {/* Search */}
        <div className="search-wrap search-anim" style={{ maxWidth: 520, margin: "0 auto 44px" }}>
          <div style={{
            position: "relative",
            background: "#fff",
            borderRadius: 999,
            border: focused ? "3px solid #FF6B6B" : "3px solid #f0e8e0",
            boxShadow: focused
              ? "0 8px 32px rgba(255,107,107,0.22), 0 2px 0 #FF6B6B44"
              : "0 4px 20px rgba(0,0,0,0.07)",
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          }}>
            <span style={{
              position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)",
              fontSize: 20, pointerEvents: "none",
              transition: "transform 0.3s ease",
              display: "block",
              ...(focused ? { transform: "translateY(-50%) scale(1.2)" } : {}),
            }}>🔍</span>
            <input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Search by name, city, company..."
              style={{
                width: "100%",
                padding: "16px 50px 16px 52px",
                fontSize: 15,
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                color: "#333",
                background: "transparent",
                border: "none",
                borderRadius: 999,
              }}
            />
            {search && (
              <button
                onClick={() => { setSearch(""); inputRef.current?.focus(); }}
                style={{
                  position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
                  background: "#FF6B6B22",
                  border: "2px solid #FF6B6B55",
                  borderRadius: "50%",
                  width: 28, height: 28,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  fontSize: 12,
                  color: "#FF6B6B",
                  fontWeight: 900,
                  transition: "background 0.2s",
                }}
              >
                ✕
              </button>
            )}
          </div>
          {/* Count pill */}
          {!loading && (
            <div style={{
              textAlign: "center", marginTop: 12,
              fontFamily: "'Nunito', sans-serif",
              fontSize: 13, color: "#b0a096", fontWeight: 700,
            }}>
              {filtered.length === users.length
                ? `Showing all ${users.length} people 🎉`
                : `Found ${filtered.length} of ${users.length} people ${filtered.length === 0 ? "😅" : "🎯"}`}
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{
            textAlign: "center",
            fontFamily: "'Fredoka One', cursive",
            fontSize: 24,
            color: "#FF6B6B",
            padding: "80px 0",
          }}>
            <div className="loader-spin" style={{ fontSize: 48, display: "inline-block", marginBottom: 16 }}>🎡</div>
            <div>Gathering the crew...</div>
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="empty-bounce" style={{
            textAlign: "center",
            padding: "80px 0",
            fontFamily: "'Fredoka One', cursive",
          }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🙈</div>
            <div style={{ fontSize: 26, color: "#FF6B6B", marginBottom: 8 }}>Nobody found!</div>
            <div style={{ fontSize: 15, color: "#b0a096", fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
              Try a different name or city
            </div>
          </div>
        )}

        {/* Cards Grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid">
            {filtered.map((user, i) => (
              <Card key={user.id} user={user} index={i} visible={visible} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
