interface DateProps {
  date: string | number | Date;
}

export default function DateComponent({ date }: DateProps) {
  return (
    <p className="text-lg font-mono-regular mb-8 text-foreground-mid">
      {new Date(date).toLocaleDateString("en-UK", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })}
    </p>
  );
}
