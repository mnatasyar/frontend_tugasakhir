import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function VideoResultCarousel({ frames }) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Frame Analisis Video</h3>
      <Carousel>
        <CarouselContent>
          {frames.map((frame, idx) => (
            <CarouselItem key={idx} className="basis-full">
              <img
                src={`http://localhost:8000/${frame.image_path}`}
                alt={`Frame ${idx + 1}`}
                className="rounded shadow-md"
              />
              <p className="text-sm mt-2">
                Frame ke-{frame.frame_index} (detik ke-{frame.frame_time_sec})
              </p>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
