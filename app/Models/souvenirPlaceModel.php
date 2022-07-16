<?php


namespace App\Models;

use CodeIgniter\Model;

class souvenirPlaceModel extends Model
{
    protected $table = 'souvenir_place';
    protected $primaryKey = 'id';
    protected $allowedFields = ['name', 'description', 'lat', 'lng', 'geom'];
    public function getSouvenirPlaces()
    {
        $query = $this->db->table($this->table)
            ->select('*')
            ->get()->getResult();
        return $query;
    }
    public function getSouvenirPlace($id)
    {
        $query = $this->db->table($this->table)
            ->where($this->primaryKey, $id)
            ->get();
        return $query;
    }
    public function addSouvenirPlace($data)
    {
        $query = $this->db->table($this->table)->insert($data);
        return $query;
    }

    public function deleteSouvenirPlace($id)
    {
        $query = $this->db->table($this->table)->delete(array('id' => $id));
        return $query;
    }
}
