import fastCsv from "fast-csv";
import User from "../Models/UserModel.js";
import fs from "fs";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
import PDFDocument from "pdfkit";
import path from "path";

dotenv.config();

export const csv = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user || !user.logins || user.logins.length === 0) {
            return res.status(404).json({ message: "No logins found" });
        }

        //  Ensure "downloads" directory exists
        const downloadsDir = path.join(process.cwd(), "downloads");
        if (!fs.existsSync(downloadsDir)) {
            fs.mkdirSync(downloadsDir, { recursive: true });
        }

        //  Decrypt passwords
        const secretKey = process.env.SECRET_KEY;
        const logins = user.logins.map(item => ({
            Website: item.Website,
            username: item.username,
            password: CryptoJS.AES.decrypt(item.password, secretKey).toString(CryptoJS.enc.Utf8), // Decrypt password
        }));

        //  Define file path
        const fileName = `logins_${Date.now()}.csv`;
        const filePath = path.join(downloadsDir, fileName);

        //  Create write stream
        const ws = fs.createWriteStream(filePath);
        fastCsv
            .write(logins, { headers: true })
            .pipe(ws)
            .on("finish", () => {
                console.log("CSV file created:", filePath);

                //  Send file to client
                res.download(filePath, fileName, (err) => {
                    if (err) {
                        console.error("Error downloading CSV:", err);
                        return res.status(500).json({ message: "Error downloading file" });
                    }

                    //  Delete file after download
                    fs.unlink(filePath, (unlinkErr) => {
                        if (unlinkErr) console.error("Error deleting file:", unlinkErr);
                    });
                });
            })
            .on("error", (err) => {
                console.error("CSV Write Error:", err);
                res.status(500).json({ message: "Error creating CSV file" });
            });
    } catch (error) {
        console.error("CSV Export Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const json = async (req, res) => {
    try {
    
            const user = await User.findById(req.user.userId);
            if (!user || !user.logins || user.logins.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            const secretKey = process.env.SECRET_KEY;

            const logins = user.logins.map(item => ({
                Website: item.Website,
                username: item.username,
                password: CryptoJS.AES.decrypt(item.password, secretKey).toString(CryptoJS.enc.Utf8), // Decrypt password
            }));

            //  Ensure "downloads" directory exists
            const downloadsDir = path.join(process.cwd(), "downloads");
            if (!fs.existsSync(downloadsDir)) {
                fs.mkdirSync(downloadsDir, { recursive: true });
            }

            //  Save logins as JSON
            const fileName = `logins_${Date.now()}.json`;
            const filePath = path.join(downloadsDir, fileName);
            fs.writeFileSync(filePath, JSON.stringify(logins, null, 2));

            //  Send file to client
            res.download(filePath, fileName, (err) => {
                if (err) {
                    console.error("Download error:", err);
                    return res.status(500).json({ message: "Error downloading file" });
                }

                //  Delete file after download
                fs.unlink(filePath, (unlinkErr) => {
                    if (unlinkErr) console.error("Error deleting file:", unlinkErr);
                });
            });
        } catch (error) {
            console.error("Export error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
};

export const pdf = async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
      if (!user || !user.logins) {
        return res.status(404).json({ message: "No logins found" });
      }
  
      const secretKey = process.env.SECRET_KEY;
  
      const logins = user.logins.map(item => ({
        Website: item.Website,
        username: item.username,
        password: CryptoJS.AES.decrypt(item.password, secretKey).toString(CryptoJS.enc.Utf8), // Decrypt password
      }));
  
      //  Ensure "downloads" directory exists
      const downloadsDir = path.join(process.cwd(), "downloads");
      if (!fs.existsSync(downloadsDir)) {
        fs.mkdirSync(downloadsDir, { recursive: true });
      }
  
      //  Generate PDF
      const fileName = `logins_${Date.now()}.pdf`;
      const filePath = path.join(downloadsDir, fileName);
      const doc = new PDFDocument();
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);
  
      doc.fontSize(16).text("User Saved Logins", { align: "center" }).moveDown(2);
  
      logins.forEach((login) => {
        doc.fontSize(12).text(`Website: ${login.Website}`);
        doc.text(`Username: ${login.username}`);
        doc.text(`Password: ${login.password}`);
        doc.moveDown(1);
      });
  
      doc.end();
  
      stream.on("finish", () => {
        res.download(filePath, fileName, () => {
          fs.unlinkSync(filePath); // Delete file after download
        });
      });
    } catch (error) {
      console.error("PDF Export Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };