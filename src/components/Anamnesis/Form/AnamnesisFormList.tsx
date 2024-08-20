import { useState, useMemo, useEffect } from 'react';
import { debounce } from 'lodash';

const AnamnesisFormList = ({ forms, setForms, handleIdChange, handleNextPage }: any) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'asc' });
    const [filteredForms, setFilteredForms] = useState(forms);
    const itemsPerPage = 5;

    // Debounced Search Handler
    const debouncedSearch = useMemo(() => debounce((term) => {
        simulateAsyncSearch(term);
    }, 300), []);

    const simulateAsyncSearch = async (term: any) => {
        const filtered = forms.filter((item: any) =>
            item.title.toLowerCase().includes(term.toLowerCase()) ||
            item.description.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredForms(filtered);
    };

    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm, debouncedSearch]);

    const sortedData = useMemo(() => {
        if (!sortConfig) return filteredForms;
        const sorted = [...filteredForms].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
        return sorted;
    }, [filteredForms, sortConfig]);

    // Paginated Data
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedData.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedData, currentPage]);

    const totalPages = Math.ceil(filteredForms.length / itemsPerPage);

    const handleSort = (key: any) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                return { ...prev, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            }
            return { key, direction: 'asc' };
        });
    };

    const handleButton = (id: number, type: string) => {

        switch (type) {
            case 'view':
                handleIdChange(id);
                handleNextPage(3)
                break;
            case 'edit':
                handleIdChange(id);
                handleNextPage(2)
                break;
            case 'delete':
                handleDelete(id)
                break;
            default:
                break;
        }
    };

    const handleDelete = (id: number) => {
        const updateForms = forms.filter((form: any) => form.id !== id);
        setForms(updateForms)
        setFilteredForms(updateForms)
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center my-4">List Anamnesis Forms</h1>
            <div className="flex justify-between items-center mb-4">
                <button className="bg-blue-500 text-white rounded-lg px-3 py-1 flex items-center" onClick={() => handleNextPage(1)} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg> Add
                </button>
                <input
                    type="text"
                    className="border rounded-lg p-2 w-1/3"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="border-b p-4 text-left cursor-pointer" onClick={() => handleSort('title')}>
                            Title {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="border-b p-4 text-left cursor-pointer" onClick={() => handleSort('description')}>
                            Description {sortConfig.key === 'description' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="border-b p-4 text-left cursor-pointer" onClick={() => handleSort('createdAt')}>
                            Creation Date {sortConfig.key === 'createdAt' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="border-b p-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item: any) => (
                        <tr key={item.id}>
                            <td className="border-b p-4">{item.title}</td>
                            <td className="border-b p-4">{item.description}</td>
                            <td className="border-b p-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                            <td className="border-b p-4 flex space-x-2">
                                <button className="bg-blue-500 text-white rounded-lg px-3 py-1 flex items-center" onClick={() => handleButton(item.id, 'view')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg> View
                                </button>
                                <button className="bg-green-500 text-white rounded-lg px-3 py-1 flex items-center" onClick={() => handleButton(item.id, 'edit')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>
                                    Edit
                                </button>
                                <button className="bg-red-500 text-white rounded-lg px-3 py-1 flex items-center" onClick={() => handleButton(item.id, 'delete')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center bg-gray-200 px-3 py-1 rounded-lg disabled:opacity-50"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg> Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center bg-gray-200 px-3 py-1 rounded-lg disabled:opacity-50"
                >
                    Next <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>

                </button>
            </div>
        </div>
    );
};

export default AnamnesisFormList;