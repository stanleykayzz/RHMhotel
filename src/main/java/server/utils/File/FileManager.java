package server.utils.File;

import org.springframework.web.multipart.MultipartFile;

import java.io.*;

/**
 * Created by maxime on 20/09/2017.
 */
public class FileManager {

    public FileManager() {

    }

    public void saveImage(MultipartFile fileClient, String pathServer) {
        InputStream is = null;
        OutputStream os = null;

        try {
            is = fileClient.getInputStream();
            os = new FileOutputStream(new File(System.getProperty("user.dir") + pathServer));
            byte[] buffer = new byte[1024];
            int length;
            while ((length = is.read(buffer)) > 0) {
                os.write(buffer, 0, length);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                assert is != null;
                is.close();

                assert os != null;
                os.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
