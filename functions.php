<?php
/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 */

// Load Composer dependencies.
require_once __DIR__ . '/vendor/autoload.php';

require_once __DIR__ . '/src/StarterSite.php';

Timber\Timber::init();

// Sets the directories (inside your theme) to find .twig files.
Timber::$dirname = [ 'templates', 'views' ];

new StarterSite();

function register_project_category_taxonomy() {
    $labels = [
        'name' => 'Project Categories',
        'singular_name' => 'Project Category',
        'search_items' => 'Search Project Categories',
        'all_items' => 'All Project Categories',
        'parent_item' => 'Parent Project Category',
        'parent_item_colon' => 'Parent Project Category:',
        'edit_item' => 'Edit Project Category',
        'update_item' => 'Update Project Category',
        'add_new_item' => 'Add New Project Category',
        'new_item_name' => 'New Project Category Name',
        'menu_name' => 'Project Categories',
    ];

    $args = [
        'hierarchical' => true,
        'labels' => $labels,
        'show_ui' => true,
        'show_admin_column' => true,
        'query_var' => true,
        'rewrite' => ['slug' => 'project-category'],
    ];

    register_taxonomy('project_category', ['project'], $args);
}
add_action('init', 'register_project_category_taxonomy');

function register_project_post_type() {
    register_post_type('project', [
        'labels' => [
            'name' => 'Projets',
            'singular_name' => 'Projet'
        ],
        'public' => true,
        'has_archive' => true,
        'supports' => ['title', 'editor', 'thumbnail'],
        'menu_icon' => 'dashicons-building',
        'rewrite' => ['slug' => 'projets'],
        'show_in_rest' => true,
        'taxonomies' => ['project_category'],
    ]);
}
add_action('init', 'register_project_post_type');

// Add custom image sizes
add_action('after_setup_theme', function() {
    add_theme_support('post-thumbnails');
    // Remove default image sizes to save space
    remove_image_size('1536x1536');
    remove_image_size('2048x2048');
    // Add custom sizes
    // Much smaller sizes
    add_image_size('project-grid', 600, 800, true);     // Grid thumbnail
    add_image_size('project-medium', 800, 1067, true);  // Medium size
    add_image_size('project-large', 1200, 1600, true);  // Large size
});

// Add upload guidance
add_filter('admin_post_thumbnail_html', function($content) {
    return $content .= '<p>Recommended image size: 1500x2000 pixels</p>';
});
// Set max width for image uploads
add_filter('big_image_size_threshold', function($threshold) {
    return 2000; // Maximum image width
});

function enqueue_theme_styles() {

        // Style
		wp_enqueue_style( 'vq', get_template_directory_uri() . '/dist/style.css', array(), wp_get_theme()->get( 'Version' ) );

        //Script
		wp_enqueue_script( 'vq', get_template_directory_uri() . '/dist/test_martin.umd.js', array(), wp_get_theme()->get( 'Version' ), true );

}
add_action('wp_enqueue_scripts', 'enqueue_theme_styles');