import { Result } from "ts-results";

const useApi = <T extends {}>(path: string): Result<T, string> => {
  const result: Result = await fetch()
}

export default useApi