import dayjs from 'dayjs';
import { useEffect } from 'react';

export const useHighlightCurrentDate = (isOpen: boolean) => {
  useEffect(() => {
    const currentDate = dayjs().format('YYYY-MM-DD');

    const observer = new MutationObserver(() => {
      document.querySelectorAll('td').forEach((td) => {
        const dataSource = td.getAttribute('data-day');
        const isToday = dataSource === currentDate;

        if (isToday) {
          td.classList.add('rdp-selected');
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [isOpen]);
};
