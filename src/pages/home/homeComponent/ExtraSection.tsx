import Blogs from "./Blogs";
import Testimonial from "./Testimonial";







export default function ExtraSection() {
  return (
    <div className="container mx-auto px-4 py-12">
      
      <div>
        <Testimonial></Testimonial>
      </div>
      <div>
        <Blogs></Blogs>
      </div>
    </div>
  );
}
