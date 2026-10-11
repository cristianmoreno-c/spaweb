export default function SocialLine({ name, value }: { name: string; value: string }) {
  const link = /^https?:\/\//.test(value);
  return <p>{name}: {link ? <a href={value} target="_blank" rel="noopener noreferrer">{value.replace(/^https?:\/\/(www\.)?/, '')}</a> : value}</p>;
}
