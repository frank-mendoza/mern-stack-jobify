import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { createContext, useContext } from "react";

export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    const { data } = await customFetch.get("/jobs", {
      params,
    });

    return {
      data,
      searchValues: { ...params },
    };
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const AllJobsContext = createContext();

const AllJobs = () => {
  const { data } = useLoaderData();

  return (
    <AllJobsContext.Provider value={{ data }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};
export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
