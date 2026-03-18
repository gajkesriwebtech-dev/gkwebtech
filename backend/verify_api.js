// Native fetch used

const test = async () => {
  const baseUrl = "http://localhost:5000/api/blogs";
  
  console.log("Testing GET /api/blogs?lang=en");
  const resList = await fetch(`${baseUrl}?lang=en`);
  const list = await resList.json();
  console.log(`Found ${list.length} blogs`);
  
  if (list.length > 0) {
    const slug = list[0].slug;
    console.log(`Testing GET /api/blogs/${slug}?lang=en`);
    const resDetail = await fetch(`${baseUrl}/${slug}?lang=en`);
    const detail = await resDetail.json();
    console.log(`Blog title: ${detail.title}`);
    console.log(`Has internal links: ${detail.content.includes('Related Articles')}`);
  }
};

test();
