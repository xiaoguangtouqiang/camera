package com.photo.service.fs;


import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static com.photo.config.Constants.CAMERA;

/**
 * Created by DiDi on 2017/8/31.
 */
public class Location {

    private String home;

    private List<String> paths;

    public Location() {
        this(null, new ArrayList<>());
    }

    public Location(List<String> paths) {
        this(null, paths);
    }

    public Location(String home, List<String> paths) {
        this.home = home;
        this.paths = paths;
    }

    public String getHome() {
        if (home == null) {
            String pdas_home = System.getenv("PDAS_HOME");
            home = pdas_home == null ? "/var/lib/docker/volumes" : pdas_home;
        }
        return home;
    }

    public void setHome(String home) {
        this.home = home;
    }

    public Path path() {
        return Paths.get(getHome(), paths.toArray(new String[paths.size()]));
    }

    public Path relativize() {
        return Paths.get(getHome()).relativize(path());
    }

    public File toFile() {
        return path().toFile();
    }

    private Location path(String path, String... more) {
        paths.add(path);
        Collections.addAll(this.paths, more);
        return this;
    }

    private Location format(String... args) {
        String format = String.format(paths.stream().collect(Collectors.joining("/")), args);
        this.paths = new ArrayList<>();
        Collections.addAll(this.paths, format.split("/"));
        return this;
    }

    public Location get(String... more) {
        Collections.addAll(this.paths, more);
        return this;
    }

    public static Location root() {
        return new Location();
    }

    public static Location camera() {
        return root().path(CAMERA);
    }

    public static Location getUploadImagePath(String userId) {
        return camera().get(userId);
    }


}
