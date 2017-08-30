package com.photo.service.fs;


import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static cn.datarx.studio.config.Constants.*;

/**
 * Created by Yuan on 2017/6/9.
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

    public static Location pdas() {
        return root().path(PDAS);
    }

    public static Location config() {
        return pdas().path(CONFIG);
    }

    public static Location project() {
        return config().path("%s");
    }

    public static Location ml(String project, String... more) {
        return project().path(ML).format(project).get(more);
    }

    public static Location analysisData(String project, String... more) {
        return pdas().path(ANALYSIS_DATA).path("%s").format(project).get(more);
    }

    public static Location sm(String project, String... more) {
        return project().path(MODELS).format(project).get(more);
    }

    public static Location model(String project, String... more) {
        return pdas().path(MODELS).path("%s").format(project).get(more);
    }

    public static Location recipe(String project, String... more) {
        return project().path(RECIPES).format(project).get(more);
    }

    public static Location notebook(String project, String... more) {
        return root().path(NOTEBOOK).format(project).get(more);
    }

    public static Location dataset(boolean isOrg, String base, String... more) {
        return pdas().path(isOrg ? ORG : CONFIG, "%s", DATASETS).format(base).get(more);
    }

    public static Location analysis(String project, String... more) {
        return project().path(ANALYSIS).format(project).get(more);
    }

}
