/**
 * Institutional Data Export Utility
 * Handles conversion of JSON collections to CSV format for administrative analysis.
 */

export function exportToCSV(data: any[], filename: string) {
    if (!data || !data.length) return;

    // 1. Extract Headers
    const headers = Object.keys(data[0]);
    
    // 2. Map Rows
    const csvRows = data.map(row => {
        return headers.map(header => {
            const val = row[header];
            // Handle strings with commas or newlines
            if (typeof val === 'string') {
                const escaped = val.replace(/"/g, '""').replace(/\n/g, ' ');
                return `"${escaped}"`;
            }
            return val;
        }).join(',');
    });

    // 3. Combine Headers and Rows
    const csvContent = [headers.join(','), ...csvRows].join('\n');

    // 4. Create Download Link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
