import Transaction from '../models/transactionModel.js'

export const getTransaction = async (req, res) => {
    try {
        const { type, category, date } = req.query; // 👈 use query params
        const filter = {};

        // Add filters only if provided
        if (type) filter.type = type;
        if (category) filter.category = category;
        if (date) {
            // Filter by specific date (ignoring time)
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);

            filter.date = { $gte: startOfDay, $lte: endOfDay };
        }

        const allTransactions = await Transaction.find(filter).sort({ date: -1 });

        res.status(200).json({ count: allTransactions.length, allTransactions });
    } catch (error) {
        console.error("error in getTransactions:", error);
        res.status(500).json({ message: "error in getTransactions " + error.message });
    }
};


export const getOneTransaction = async (req, res) => {
    try {
        const {id} = req.params;
        const transaction = await Transaction.findById(id);
        res.status(200).json({ transaction });
    } catch (error) {
        console.log("error in getOneTransaction " + error);
        res.status(500).json({ message: "error in getOneTransaction " + error.message });
    }
}

export const addTransaction = async (req, res) => {
    try {
        const { type, amount, description, category,date } = req.body;

        if (!type || !amount || !description || !category || !date ) {
            return res.status(400).json({ message: "All fields required" });
        }

        const newTransaction = await new Transaction({
            type,
            amount,
            description,
            category,
            date
        });

        await newTransaction.save();

        res.status(201).json({ newTransaction,message:"Transaction added successfully" });
    } catch (error) {
        console.log("error in addTransactions " + error);
        res.status(500).json({ message: "error in addTransactions " + error.message });
    }

}

export const updateTransaction = async (req, res) => {
    try {
        const {id} = req.params;
        const { type, amount, description, category } = req.body;

        if (!type || !amount || !description || !category) {
            return res.status(400).json({ message: "All fields required" });
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate(id,{
            type,
            amount,
            description,
            category
        },{new:true});

        res.status(200).json({ updatedTransaction,message:"ransaction updated  successfully" });
    } catch (error) {
        console.log("error in updateTransactions " + error);
        res.status(500).json({ message: "error in updateTransactions " + error.message });
    }

}

export const deleteTransaction = async (req, res) => {
    try {
        const {id} = req.params;
        const transaction = await Transaction.findById(id);
        const deletedTransaction = await Transaction.findByIdAndDelete(id);

        res.status(200).json({ transaction,message:"Transaction deleted  successfully" });
    } catch (error) {
        console.log("error in deleteTransaction " + error);
        res.status(500).json({ message: "error in deleteTransaction " + error.message });
    }

}