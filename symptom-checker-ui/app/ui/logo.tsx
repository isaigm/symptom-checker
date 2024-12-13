import { lusitana } from '../ui/fonts/fonts';

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <p className="text-[32px]">Symptom Checker</p>
    </div>
  );
}
