interface Cate {
  nameBn: string;
  icon: string;
  id: string;
}

const NavItem = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
  );
  const data = await res.json();
  // console.log("categories data : ", data);

  return (
    <div className="container mx-auto my-5">
      <div>
        {data.map((cat: Cate) => (
          <span key={cat.id} className="mx-3 font-semibold">
            <span className="mx-2">{cat.icon}</span>
            <span>{cat.nameBn}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default NavItem;
