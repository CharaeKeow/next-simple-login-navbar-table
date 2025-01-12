// Note: Since this is inspired by shadcn/ui, this file breaks our convention for putting 1 component inside one file

import { cn } from '@/utils/cn';

const Table = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="relative w-full overflow-auto">
    <table className={cn('w-full text-sm', className)} {...props} />
  </div>
);

const TableHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={cn('[&_tr]:border-b', className)} {...props} />
);

const TableBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={cn('[&_tr:last-child]:border-b', className)} {...props} />
);

const TableRow = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className={cn('border-b transition-colors hover:bg-gray-100/50', className)}
    {...props}
  />
);

const TableHead = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={cn('h-10 px-2 text-left font-semibold', className)}
    {...props}
  />
);

const TableCell = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn('p-3', className)} {...props} />
);

export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow };
