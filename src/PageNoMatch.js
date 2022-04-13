const PageNoMatch = ({children}) => {
  return (
      <div>
          {children || '404 found.'}
      </div>
  );
}

export default PageNoMatch;
