const SpecializedAgency = require("../models/SpecializedAgency");

// ✅ Fetch all specialized agencies
exports.getSpecialAgencies = async (req, res) => {
    try {
        const agencies = await SpecializedAgency.find();
        res.json(agencies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ Add a new specialized agency
exports.addSpecialAgency = async (req, res) => {
    try {
        const { name, description, keyFeatures, partnerOrganizations, currentAssociates, contactDetails } = req.body;
        const newAgency = new SpecializedAgency({
            name,
            description,
            keyFeatures,
            partnerOrganizations,
            currentAssociates,
            contactDetails
        });

        await newAgency.save();
        res.status(201).json({ message: "Specialized Agency added successfully", agency: newAgency });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ Update an existing specialized agency
exports.updateSpecialAgency = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAgency = await SpecializedAgency.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedAgency) {
            return res.status(404).json({ error: "Agency not found" });
        }
        res.json({ message: "Agency updated successfully", agency: updatedAgency });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ Delete a specialized agency
exports.deleteSpecialAgency = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAgency = await SpecializedAgency.findByIdAndDelete(id);

        if (!deletedAgency) {
            return res.status(404).json({ error: "Agency not found" });
        }
        res.json({ message: "Agency deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
