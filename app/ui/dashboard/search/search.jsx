"use client";

import { MdSearch } from "react-icons/md";
import styles from "./search.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname(); // Grab exsisting URL /users

  const handleSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);

    //as we typing this create the query param and as we delete what in search field, this delete query param
    if (e.target.value) {
      //Start quering if the search input length is higher than 2 characters
      e.target.value.length > 2 && params.set("q", e.target.value);
    } else {
      params.delete("q");
    }

    replace(`${pathname}?${params}`); //Replace exsisting URL (which grabs from usePathname) with newly created search param
  }, 300);

  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
