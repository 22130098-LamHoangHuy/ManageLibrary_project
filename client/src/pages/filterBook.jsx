import { categories } from "../utils/categories";
import { publishers } from "../utils/publishers";
import { Link, useParams } from "react-router-dom";
import BooksFiltered from "../components/booksFiltered";
import { slugify } from "../utils/slugify";

const FilterBook = () => {
  const { category, subCategory } = useParams();
  console.log(category, subCategory);

  return (
    <div className="w-full max-w-[90%]  grid grid-cols-9 grid-rows-5 gap-4">
      <div className="col-span-2 row-span-5 border rounded-md p-2">
        <ul className="menu rounded-box w-full">
          <div className="mb-1">
            <p className="text-sm">Thể loại</p>
          </div>
          {categories.map((category, index) => (
            <li key={index}>
              <details>
                <summary className="text-sm hover:bg-info">
                  <Link to={`/${slugify(category.title)}?page=1`}>
                    {category.title}
                  </Link>
                </summary>
                <ul className="">
                  {category.links.map((link, indx) => (
                    <li key={indx} className="hover:bg-info">
                      <Link
                        to={`/${slugify(category.title)}/${slugify(
                          link
                        )}?page=1`}
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
        <ul className="menu rounded-box w-full">
          <div className="mb-1">
            <p className="text-sm">Nhà Xuất Bản</p>
          </div>
          {publishers.map((publisher, index) => (
            <li key={index}>
              <label className="label text-black">
                <input type="checkbox" className="checkbox checkbox-xs" />
                {publisher.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-7 row-span-5 border rounded-md">
        <div className="ms-5 mt-4 flex row">
          <span className="flex items-center me-2">sắp xếp theo:</span>
          <select defaultValue="Pick a color" className="select w-45">
            <option selected>đọc nhiều nhất tuần</option>
            <option>đọc nhiều nhất tháng</option>
            <option>đọc nhiều nhất năm</option>
          </select>
        </div>

        <BooksFiltered />
      </div>
    </div>
  );
};

export default FilterBook;
