import Link from "next/link";

export default function Home() {
  return (
    <main className=" h-full flex justify-center items-center">
      <div className="shadow-md max-w-md ">
        <h1 className="text-center text-2xl pb-1">Napster</h1>
        <p className="text-center">
          Listen to your favorite music, or upload your own
        </p>
        <span className="divider" />
        <div className="flex flex-col gap-3">
          <Link href="/home" className="btn btn-primary">
            I want jams
          </Link>
          <Link href="/dashboard" className="btn">
            I make 'em
          </Link>
          <Link href="/admin" className="btn">
            I'm the boss
          </Link>
        </div>
      </div>
    </main>
  );
}
