import { useState, useCallback, useEffect } from 'react';
import queryString from 'query-string';
import { useNavigate, useLocation } from 'react-router-dom';

export interface QueryParams {
  per_page?: number,
  page?: number,
}

export function useQueryString<T extends QueryParams>(initialState: T): [T, (newState: Partial<T>) => void, (param: string) => string | undefined, string] {
  const [state, setState] = useState<T>(initialState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = queryString.parse(location.search);
    const mergedParams = { ...initialState, ...params };
    const hasAllParams = Object.keys(mergedParams).every(key => mergedParams[key] !== undefined);

    if (!hasAllParams) {
      const newQueryString = queryString.stringify(mergedParams, { skipEmptyString: true, skipNull: true });
      // Replace the current entry in the history stack
      navigate(`?${newQueryString}`, { replace: true });
      setState(mergedParams as T);
    } else {
      setState(mergedParams as T);
    }
  }, [navigate, initialState, location.search]);

  const setQueryString = useCallback((newState: Partial<T>) => {
    const updatedState = { ...state, ...newState };
    const newQueryString = queryString.stringify(updatedState, { skipEmptyString: true, skipNull: true });

    setState(updatedState);
    // Navigate without replacing the current entry in the history stack
    navigate(`?${newQueryString}`);
  }, [state, navigate]);

  const getQueryParam = useCallback((param: string): string | undefined => {
    const params = queryString.parse(location.search);
    return params[param] as string | undefined;
  }, [location.search]);

  return [state, setQueryString, getQueryParam, location.search];
}
