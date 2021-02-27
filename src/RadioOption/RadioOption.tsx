/** @jsx h */
import { h } from 'preact';
import './RadioOption.module.css';

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
            className='root'
        >
            <div
                className='header'
                style={{marginBottom: selected ? '1rem' : '0'}}
            >
                <div className="flex items-center h-5">
                    <input
                        id={`settings-option-${optionKey}`}
                        type="radio"
                        className={'radio h-4 w-4 text-indigo-600 cursor-pointer border-gray-300'}
                        checked={selected}
                        readOnly
                    />
                </div>
                <label
                    htmlFor={`settings-option-${optionKey}`}
                    className='radio__label'
                >
                    <span style={{marginTop: '0.125rem'}}>
                        {title}
                    </span>
                </label>
            </div>

            <div
                className='body'
                style={{display: selected ? 'block' : 'none'}}
            >
                {children}
            </div>
        </div>
    )
}

export { RadioOption };
