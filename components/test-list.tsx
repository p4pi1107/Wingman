// components/TestList.tsx
import Link from 'next/link';
import PropTypes from 'prop-types';
import TestItem from "./test-item"

interface Test {
  id: string;
  testName: string;
  description: string;
  tips: string[];
}

const TestList = ({ tests }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {tests.map((test) => (
        <TestItem key={test.id} test={test} />
      ))}
  </div>
);
};


TestList.propTypes = {
  tests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      tips: PropTypes.string.isRequired
    })
  ).isRequired,
};

export default TestList;
