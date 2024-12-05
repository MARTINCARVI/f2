<?php
/**
 * The main template file
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

$context          = Timber::context();
// Get all projects
$context['projects'] = Timber::get_posts(
	['post_type' => 'project', 'posts_per_page' => -1,],
);
$context['categories'] = Timber::get_terms([
    'taxonomy' => 'project_category',
    'hide_empty' => true,
]);

// Add menu items
$context['menu_items'] = [
    ['title' => 'Projets', 'link' => '/projets'],
    ['title' => 'À propos', 'link' => '/a-propos'],
    ['title' => 'Contact', 'link' => '/contact']
];
// Add social links
$context['social_links'] = [
    'instagram' => 'https://www.instagram.com/la_fabrique_au_carre/'
];

// Site title
$context['site_title'] = 'La Fabrique au Carré';

$templates        = array( 'index.twig' );
if ( is_home() ) {
	array_unshift( $templates,'home.twig' );
}
Timber::render( $templates, $context );
