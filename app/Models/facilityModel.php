<?php


namespace App\Models;

use CodeIgniter\Model;

class facilityModel extends Model
{
    protected $table = 'facility';
    protected $primaryKey = 'id';
    protected $allowedFields = ['name', 'description', 'lat', 'lng', 'geom'];
    public function getFacilities()
    {
        $query = $this->db->table($this->table)
            ->select('*')
            ->get()->getResult();
        return $query;
    }
    public function getFacility($id)
    {
        $query = $this->db->table($this->table)
            ->where($this->primaryKey, $id)
            ->get();
        return $query;
    }
    public function addFacility($data)
    {
        $query = $this->db->table($this->table)->insert($data);
        return $query;
    }
    public function deleteFacility($id)
    {
        $query = $this->db->table($this->table)->delete(array('id' => $id));
        return $query;
    }
}
