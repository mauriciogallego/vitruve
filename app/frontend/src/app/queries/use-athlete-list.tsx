import { useInfiniteQuery } from '@tanstack/react-query';
import { get } from '../helper/api';

const useAthleteList = () => {
  const { data, fetchNextPage, refetch } = useInfiniteQuery({
    queryKey: ['athletes'],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      get(`/athletes`, {
        params: {
          take: 20,
          skip: 20 * pageParam,
        },
      }).then((response) => response.data),
    getNextPageParam: (
      lastPage: {
        results: unknown;
        pagination: { hasMore: boolean };
      },
      pages: unknown[]
    ) => (lastPage?.pagination.hasMore ? pages.length : undefined),
  });

  const list = data?.pages.flatMap((page) => page.results) ?? [];

  return {
    list,
    refetch,
    fetchNextPage,
  };
};

export default useAthleteList;
