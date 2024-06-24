/* .move-to-top class definition */
// .move-to-top {
//   transform: translateY(-30px);
//   transition: transform 0.2s ease, opacity 0.2s ease;
//   opacity: 1;
// }

export default function Textarea({ placeholder, error, onChange, value, name, rows = 5 }) {
  return (
    <div className={`relative flex flex-col `}>
        <small className={` text-gray-500 transition-transform top-8 left-2.5 z-20  rounded-sm bg-white px-1 absolute  ${value ? 'move-to-top' : ''}`}>{!value || placeholder}</small>
      <textarea
        rows={rows}
        name={name}
        value={value}
        onChange={onChange}
        className={`mt-[12px] block  mb-4 resize-none  w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2 
        ${error ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-300'}`}
        placeholder={placeholder}
      />
      {error ? <small className="text-red-500 left-2 absolute -bottom-0">{error}</small> : null}
    </div>
  );
}
