import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { Front } from '../../components/groups/Front';
import { Backend } from '../../components/groups/Backend';
import { TypeAnimation } from 'react-type-animation';
import { FaCode } from 'react-icons/fa';
import { AiFillDatabase } from 'react-icons/ai';
import { FcStatistics } from 'react-icons/fc';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGroupsStore } from '../../hooks/useGroupsStore';

/**
 * @type {React.ExoticComponent<import('@szhsin/react-accordion').AccordionItemProps>}
 */
const AccordionItem = ({ header, ...rest }) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }) => (
      <>
        {header}
        <AiOutlineArrowDown
          className={`ml-auto transition-transform duration-500 ease-out  ${
            isEnter && 'rotate-180 text-purple-500 font-black'
          }`}
        />
      </>
    )}
    className='border-b'
    buttonProps={{
      className: ({ isEnter }) =>
        `flex w-full p-4 text-left hover:bg-purple-900 ${
          isEnter && 'bg-neutral-700 '
        }`,
    }}
    contentProps={{
      className: 'transition-height duration-500 ease-out',
    }}
    panelProps={{ className: '' }}
  />
);

export const GroupPage = () => {
  const { getGroups } = useGroupsStore();

  // useEffect(() => {
  //   getGroups();
  // }, []);

  const { groups } = useSelector((state) => state.group);

  const frontGroups = groups?.filter((group) => group.type === 'front');
  const backGroups = groups?.filter((group) => group.type === 'back');

  return (
    <>
      <div className='w-full flex  sm:items-center  justify-start sm:justify-center p-5 lg:p-0  sm:mt-4  h-20'>
        <h1 className=' text-white font-semibold  mb-5'>
          <span className='lg:text-2xl'>
            <TypeAnimation
              sequence={[
                'Unete',
                2000,
                'A los grupos',
                2000,
                'De tu preferencia.',
                2000,
              ]}
              speed={50}
              className='text-accent text-neutral-100'
              wrapper='span'
              repeat={Infinity}
            />
          </span>
        </h1>
      </div>
      <div className='mx-2 my-4 border bg-neutral-800 rounded-lg '>
        <Accordion className='font-black' transition transitionTimeout={500}>
          <AccordionItem
            header={
              <div className='flex items-center space-x-2'>
                <FaCode className='w-5 h-5' />
                <p>Front</p>
              </div>
            }
            initialEntered
          >
            <Front frontGroups={frontGroups} />
          </AccordionItem>

          <AccordionItem
            header={
              <div className='flex items-center space-x-2'>
                <AiFillDatabase className='w-5 h-5' />
                <p>Back</p>
              </div>
            }
          >
            <Backend backGroups={backGroups} />
          </AccordionItem>

          <AccordionItem
            header={
              <div className='flex items-center space-x-2'>
                <FcStatistics className='w-6 h-6' />
                <p>Data Analysis</p>
              </div>
            }
          >
            Suspendisse massa risus, pretium id interdum in, dictum sit amet
            ante. Fusce vulputate purus sed tempus feugiat.
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};
