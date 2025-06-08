export default function AppAvatar({ url, alt }) {
  return (
    <img
      src={url}
      alt={alt}
      className="w-16 h-16 rounded-full border-2 flex-shrink-0 object-cover"
    />
  );
}
