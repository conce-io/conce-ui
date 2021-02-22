/** @jsx h */
import { h } from 'preact';
// import styles from './RadioOption.module.css';

interface Props {
    title: string | JSX.Element;
    selected: boolean;
    onClick: () => void;
    optionKey: string;
    children: JSX.Element,
}

const RadioOption = ({title, selected, onClick, optionKey, children}: Props) => {
    return (
        <div
            onClick={onClick}
            className={`relative cursor-pointer border p-4`}
        >
            <div className={`flex ${!selected || 'mb-4'}`}>
                <div className="flex items-center h-5">
                    <input
                        id={`settings-option-${optionKey}`}
                        name="gateway_setting"
                        type="radio"
                        className={`focus:ring-indigo-500 h-4 w-4 text-indigo-600 cursor-pointer border-gray-300`}
                        checked={selected}
                        readOnly
                    />
                </div>
                <label
                    htmlFor={`settings-option-${optionKey}`}
                    className={`ml-3 flex flex-col cursor-pointer`}
                >
                    <span className={`${typeof title === 'string' ? '-mt-0.5' : 'mt-0.5'} block text-md`}>
                        {title}
                    </span>
                </label>
            </div>

            <div className={`block cursor-default ${selected ? 'block' : 'hidden'}`}>
                {children}
            </div>
        </div>
    )
}

export { RadioOption };
