export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
