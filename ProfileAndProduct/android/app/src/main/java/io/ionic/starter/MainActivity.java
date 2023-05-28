package io.ionic.starter;
import com.davidnoy.file-extra-data-plugin.FileExtraDataPlugin;

import android.content.pm.ActivityInfo;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import java.util.ArrayList;

public class MainActivity extends BridgeActivity {

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
    add(FileExtraDataPlugin.class)
  }

  @Override
  public ArrayList<Class<? extends Plugin>> getPlugins() {
    return super.getPlugins();
  }
}
