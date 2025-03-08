
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className='h-screen w-56 bg-red-300'>
      {children}
    </div>
  );
}
