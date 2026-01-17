
import languageCollection from '../models/language.js';

const language = {
    addLanguage: async (req, res) => {
        try {
            const { name } = req.body;
            const existingLanguage = await languageCollection.findOne({ name: name.toLowerCase().trim() });
            if (existingLanguage) {
                console.log("Language name already exists.");
                res.status(400).json({ error: 'Language name already exists.' });
                return;
            }
            const language = new languageCollection({ name: name.toLowerCase().trim() });
            await language.save();
            res.status(200).json({ message: "Language added successfully.", _id: language._id });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getLanguages: async (req, res) => {
        try {
            const languages = await languageCollection.find().lean();
            const titleCaseLanguages = languages.map(lang => ({
                ...lang,
                name: lang.name
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')
            }));
            res.status(200).json({
                message: "Language fetched successfully.",
                data: titleCaseLanguages
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }


};

export default language;
