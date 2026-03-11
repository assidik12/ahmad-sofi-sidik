export default function ProfilePlaceholder({ size = 128 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size }} className="rounded-3xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-sky-500/20">
      <span className="text-4xl select-none">👨‍💻</span>
    </div>
  );
}
