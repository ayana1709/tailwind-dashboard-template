import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

function ButtonOperation({ displayedRepairs, headers, filename }) {
  const exportJobOrder = (headers) => {
    const doc = new jsPDF();
    doc.text("Job Orders Report", 20, 10);
    doc.autoTable({
      head: [headers],
      body: displayedRepairs.map((repair) => [
        repair.id?.toString() || "N/A",
        repair.customer_name || "N/A",
        repair.plate_no || repair.plate_number || "N/A",
        repair.repair_category || "N/A",
        repair.received_date || "N/A",
        repair.estimated_date || "N/A",
        repair.date_out || "N/A",
        repair.priority !== undefined && repair.priority !== null
          ? repair.priority.toString()
          : "N/A",
        repair.car_status || "N/A",
        repair.action || "N/A",
      ]),
    });
    doc.save("JobOrders.pdf");
  };

  const exportBoloList = (headers) => {
    const doc = new jsPDF();
    doc.text("Bolo Report", 20, 10);
    doc.autoTable({
      head: [headers],
      body: displayedRepairs.map((repair) => [
        repair.id?.toString() || "N/A",
        repair.customer_name || "N/A",
        repair.plate_no || repair.plate_number || "N/A",
        repair.vehicle_type || "N/A",
        repair.issue_date || "N/A",
        repair.expiry_date || "N/A",
        repair.professional !== undefined && repair.professional !== null
          ? repair.professional.toString()
          : "N/A",
        repair.payment_total || "N/A",
      ]),
    });
    doc.save("BoloList.pdf");
  };

  const exportWheelAlignment = (headers) => {
    const doc = new jsPDF();
    doc.text("Wheel Alignment Report", 20, 10);
    doc.autoTable({
      head: [headers],
      body: displayedRepairs.map((repair) => [
        repair.id?.toString() || "N/A",
        repair.customer_name || "N/A",
        repair.tin_number || "N/A",
        repair.mobile || "N/A",
        repair.professional || "N/A",
        repair.result || "N/A",
        repair.total_amount || "N/A",
      ]),
    });
    doc.save("WheelAlignment.pdf");
  };

  const exportInspection = (headers) => {
    const doc = new jsPDF();
    doc.text("Inspection Report", 20, 10);
    doc.autoTable({
      head: [headers],
      body: displayedRepairs.map((repair) => [
        repair.id?.toString() || "N/A",
        repair.customer_name || "N/A",
        repair.plate_number || "N/A",
        repair.phone_number || "N/A",
        repair.year || "N/A",
        repair.result || "N/A",
        repair.total_payment || "N/A",
      ]),
    });
    doc.save("Inspection.pdf");
  };

  const exportWorkOrder = (headers) => {
    const doc = new jsPDF();
    doc.text("Work Report", 20, 10);
    doc.autoTable({
      head: [headers],
      body: displayedRepairs.map((repair) => [
        repair.id?.toString() || "N/A",
        repair.customer_name || "N/A",
        repair.plate_number || "N/A",
        repair.repair_category || "N/A",
        repair.work_details.map((work) => work.workDescription) || "N/A",
        repair.work_details.map((work) => work.AssignTo) || "N/A",
        repair.work_details.map((work) => work.totalcost) || "N/A",
      ]),
    });
    doc.save("work order.pdf");
  };

  function handleExport(headers, filename = "joborder") {
    if (filename === "joborder") {
      exportJobOrder(headers);
    } else if (filename === "bolo") {
      exportBoloList(headers);
    } else if (filename === "wheel") {
      exportWheelAlignment(headers);
    } else if (filename === "inspection") {
      exportInspection(headers);
    } else if (filename === "work") {
      exportWorkOrder(headers);
    }
  }
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(displayedRepairs);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Job Orders");
    XLSX.writeFile(workbook, "JobOrders.xlsx");
  };

  const printTable = () => {
    window.print();
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleExport(headers, filename)}
        className="bg-blue-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-300"
      >
        PDF
      </button>
      <button
        onClick={exportToExcel}
        className="bg-orange-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-300"
      >
        Excel
      </button>
      <button
        onClick={printTable}
        className="bg-indigo-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-300"
      >
        Print
      </button>
      <button className="bg-green-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600">
        Import
      </button>
    </div>
  );
}

export default ButtonOperation;
